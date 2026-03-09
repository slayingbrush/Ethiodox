"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  createEditor,
  deleteEditor,
  isCmsConfigured,
  listAllEditors,
  slugify,
  uploadImage,
  type Editor,
} from "@/lib/cms-client";

type EditorAccess = {
  id: string;
  slug: string;
  editor_id: string;
  active: boolean;
  created_at: string;
  editors?: { id: string; name: string; slug: string; photo_url: string | null } | null;
};

const defaultEditorForm = {
  name: "",
  bio: "",
  linkLabel: "",
  linkUrl: "",
  active: true,
};

function makeUniqueSlug(base: string, existingSlugs: Set<string>) {
  if (!existingSlugs.has(base)) return base;

  let index = 2;
  while (existingSlugs.has(`${base}-${index}`)) {
    index += 1;
  }
  return `${base}-${index}`;
}

export default function ManageEditorsPage() {
  const [editors, setEditors] = useState<Editor[]>([]);
  const [accessAccounts, setAccessAccounts] = useState<EditorAccess[]>([]);
  const [editorForm, setEditorForm] = useState(defaultEditorForm);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [latestCredentials, setLatestCredentials] = useState<{ username: string; password: string } | null>(null);

  async function loadEditors() {
    if (!isCmsConfigured()) {
      setLoading(false);
      return;
    }
    try {
      setEditors(await listAllEditors());
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to load editors.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAccessAccounts() {
    try {
      const res = await fetch("/api/sanctuary/contributors", { cache: "no-store" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to load editor access.");
      }
      setAccessAccounts((await res.json()) as EditorAccess[]);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to load editor access.");
    }
  }

  useEffect(() => {
    loadEditors();
    loadAccessAccounts();
  }, []);

  function addLink() {
    if (editorForm.linkLabel && editorForm.linkUrl) {
      setLinks((prev) => ({ ...prev, [editorForm.linkLabel]: editorForm.linkUrl }));
      setEditorForm((prev) => ({ ...prev, linkLabel: "", linkUrl: "" }));
    }
  }

  function removeLink(label: string) {
    setLinks((prev) => {
      const copy = { ...prev };
      delete copy[label];
      return copy;
    });
  }

  async function provisionAccess(editorId: string, rotatePassword = false) {
    const res = await fetch("/api/sanctuary/contributors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ editorId, rotatePassword }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.error ?? "Failed to provision editor access.");
    }
    return {
      username: String(data?.username ?? ""),
      temporaryPassword: String(data?.temporaryPassword ?? ""),
      message: typeof data?.message === "string" ? data.message : null,
    };
  }

  async function handleCreateEditor(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setLatestCredentials(null);

    try {
      const baseSlug = slugify(editorForm.name);
      if (!baseSlug) throw new Error("Name must contain letters or numbers.");
      const existingSlugs = new Set(editors.map((editor) => editor.slug));
      const uniqueSlug = makeUniqueSlug(baseSlug, existingSlugs);

      let photo_url: string | null = null;
      if (photo) {
        const ext = photo.name.split(".").pop() ?? "jpg";
        photo_url = await uploadImage("editor-photos", `${uniqueSlug}.${ext}`, photo);
      }

      const createdEditor = await createEditor({
        name: editorForm.name.trim(),
        slug: uniqueSlug,
        bio: editorForm.bio.trim(),
        photo_url,
        links,
        active: editorForm.active,
      });

      const access = await provisionAccess(createdEditor.id, false);
      setLatestCredentials({
        username: access.username,
        password: access.temporaryPassword,
      });

      setEditorForm(defaultEditorForm);
      setLinks({});
      setPhoto(null);
      setStatus(access.message ?? "Editor created. Share the generated credentials manually.");
      await Promise.all([loadEditors(), loadAccessAccounts()]);
    } catch (err) {
      if (err instanceof Error && err.message.includes("editors_slug_key")) {
        setStatus("An editor with that name already exists. Please try again and use a slightly different name.");
      } else {
        setStatus(err instanceof Error ? err.message : "Failed to create editor.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteEditor(id: string) {
    if (!confirm("Delete this editor and revoke login access?")) return;
    try {
      await deleteEditor(id);
      setStatus("Editor deleted.");
      await Promise.all([loadEditors(), loadAccessAccounts()]);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to delete editor.");
    }
  }

  async function handleResetAccess(editorId: string) {
    try {
      setLatestCredentials(null);
      const result = await provisionAccess(editorId, true);
      setLatestCredentials({
        username: result.username,
        password: result.temporaryPassword,
      });
      setStatus(result.message ?? "Password reset. Share the new credentials manually.");
      await loadAccessAccounts();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to reset editor access.");
    }
  }

  async function handleRevokeAccess(accessId: string) {
    if (!confirm("Revoke this editor login access?")) return;
    try {
      const res = await fetch("/api/sanctuary/contributors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: accessId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to revoke access.");
      }
      setStatus("Editor access revoked.");
      await loadAccessAccounts();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to revoke access.");
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">Manage Editors</h1>
          <Link href="/sanctuary" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
            Back to Sanctuary
          </Link>
        </div>

        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">Add New Editor</h2>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Creating an editor automatically generates unique login credentials for you to share manually.
          </p>
          <form onSubmit={handleCreateEditor} className="grid gap-4">
            <input
              value={editorForm.name}
              onChange={(e) => setEditorForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Full name"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
              required
            />
            <textarea
              value={editorForm.bio}
              onChange={(e) => setEditorForm((p) => ({ ...p, bio: e.target.value }))}
              placeholder="Short bio"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[100px]"
              required
            />
            <div>
              <label className="text-sm text-[var(--color-text-muted)] block mb-1">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
            </div>

            <div className="border border-[var(--color-border)] rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Links</p>
              <div className="flex gap-2 mb-2">
                <input
                  value={editorForm.linkLabel}
                  onChange={(e) => setEditorForm((p) => ({ ...p, linkLabel: e.target.value }))}
                  placeholder="Label (e.g. Instagram)"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm"
                />
                <input
                  value={editorForm.linkUrl}
                  onChange={(e) => setEditorForm((p) => ({ ...p, linkUrl: e.target.value }))}
                  placeholder="URL"
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm"
                />
                <button type="button" onClick={addLink} className="px-3 py-1.5 rounded-lg bg-[var(--color-cream)] text-sm">
                  Add
                </button>
              </div>
              {Object.entries(links).map(([label, url]) => (
                <div key={label} className="flex items-center justify-between text-sm py-1">
                  <span>
                    {label}: {url}
                  </span>
                  <button type="button" onClick={() => removeLink(label)} className="text-red-700 hover:underline text-xs">
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editorForm.active}
                onChange={(e) => setEditorForm((p) => ({ ...p, active: e.target.checked }))}
              />
              Active
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="w-fit px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create Editor + Generate Login"}
            </button>
          </form>
        </section>

        {latestCredentials && (
          <section className="bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-6 mb-8">
            <h2 className="font-serif text-lg font-semibold mb-2">Generated Credentials</h2>
            <p className="text-sm mb-3">Copy these now and share with the editor manually.</p>
            <p className="text-sm">
              <strong>Username:</strong> {latestCredentials.username}
            </p>
            <p className="text-sm">
              <strong>Password:</strong> {latestCredentials.password}
            </p>
          </section>
        )}

        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">Editor Login Access</h2>
          {accessAccounts.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">No editor login accounts yet.</p>
          ) : (
            <div className="space-y-3">
              {accessAccounts.map((access) => (
                <div key={access.id} className="border border-[var(--color-border)] rounded-lg p-3 flex justify-between gap-3">
                  <div>
                    <p className="font-medium">{access.editors?.name ?? access.slug}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      username: {access.slug} &middot; {access.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleResetAccess(access.editor_id)}
                      className="text-sm text-[var(--color-primary)] hover:underline"
                    >
                      Reset Password
                    </button>
                    <button onClick={() => handleRevokeAccess(access.id)} className="text-sm text-red-700 hover:underline">
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-serif text-xl font-semibold mb-4">All Editors</h2>
          {loading ? (
            <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
          ) : editors.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">No editors yet.</p>
          ) : (
            <div className="space-y-3">
              {editors.map((editor) => (
                <div key={editor.id} className="flex items-center gap-4 border border-[var(--color-border)] rounded-lg p-3">
                  {editor.photo_url ? (
                    <img src={editor.photo_url} alt={editor.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-lg font-bold text-[var(--color-primary)]">
                      {editor.name[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{editor.name}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {editor.active ? "Active" : "Inactive"} &middot; /{editor.slug}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteEditor(editor.id)} className="text-sm text-red-700 hover:underline">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {status && <p className="mt-6 text-sm text-[var(--color-text-muted)]">{status}</p>}
      </div>
    </div>
  );
}
