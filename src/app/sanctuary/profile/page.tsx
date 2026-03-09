"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/cms-client";

type SessionInfo = {
  authenticated: boolean;
  role: "admin" | "writer";
  name: string | null;
  editorId: string | null;
};

type EditorProfile = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photo_url: string | null;
  links: Record<string, string>;
  active: boolean;
};

export default function SanctuaryProfilePage() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [profile, setProfile] = useState<EditorProfile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [links, setLinks] = useState<Record<string, string>>({});
  const [linkLabel, setLinkLabel] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const sessionRes = await fetch("/api/auth/admin", { cache: "no-store" });
        if (!sessionRes.ok) throw new Error("Unauthorized session.");
        const sessionData = (await sessionRes.json()) as SessionInfo;
        setSession(sessionData);

        if (sessionData.role !== "writer") {
          setLoading(false);
          return;
        }

        const profileRes = await fetch("/api/sanctuary/editor-profile", { cache: "no-store" });
        const profileData = await profileRes.json().catch(() => null);
        if (!profileRes.ok) throw new Error(profileData?.error ?? "Failed to load profile.");

        const loaded = profileData as EditorProfile;
        setProfile(loaded);
        setName(loaded.name);
        setBio(loaded.bio ?? "");
        setPhotoUrl(loaded.photo_url ?? "");
        setLinks(loaded.links ?? {});
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function addLink() {
    if (linkLabel.trim() && linkUrl.trim()) {
      setLinks((prev) => ({ ...prev, [linkLabel.trim()]: linkUrl.trim() }));
      setLinkLabel("");
      setLinkUrl("");
    }
  }

  function removeLink(label: string) {
    setLinks((prev) => {
      const copy = { ...prev };
      delete copy[label];
      return copy;
    });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      let nextPhotoUrl = photoUrl.trim() || null;
      if (photoFile && profile) {
        const ext = photoFile.name.split(".").pop() ?? "jpg";
        nextPhotoUrl = await uploadImage("editor-photos", `${profile.slug}-${Date.now()}.${ext}`, photoFile);
      }

      const res = await fetch("/api/sanctuary/editor-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          bio: bio.trim(),
          photo_url: nextPhotoUrl,
          links,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Failed to save profile.");

      setPhotoUrl(nextPhotoUrl ?? "");
      setPhotoFile(null);
      setStatus("Profile updated.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="py-16 text-center text-[var(--color-text-muted)]">Loading...</div>;
  }

  if (session?.role !== "writer") {
    return (
      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)] mb-3">Editor Profile</h1>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            This page is available only for editor accounts.
          </p>
          <Link href="/sanctuary" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
            Back to Sanctuary
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">Your Profile</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Update your name, bio, photo, and links.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/sanctuary/blogs" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
              Back to Blog Studio
            </Link>
            <Link href="/editors" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm" target="_blank">
              View Editors Page
            </Link>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-[var(--color-border)] rounded-xl p-6 grid gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Display name"
            className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
            required
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Short bio"
            className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[140px]"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[var(--color-text-muted)] block mb-1">New profile photo</label>
              <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)} />
            </div>
            <div>
              <label className="text-sm text-[var(--color-text-muted)] block mb-1">Or photo URL</label>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
              />
            </div>
          </div>

          <div className="border border-[var(--color-border)] rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Links</p>
            <div className="flex gap-2 mb-2">
              <input
                value={linkLabel}
                onChange={(e) => setLinkLabel(e.target.value)}
                placeholder="Label"
                className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-sm"
              />
              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
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

          <button
            type="submit"
            disabled={saving}
            className="w-fit px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-[var(--color-text-muted)]">{status}</p>}
      </div>
    </div>
  );
}
