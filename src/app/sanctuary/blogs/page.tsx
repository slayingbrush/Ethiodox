"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  isCmsConfigured,
  listAllArticles,
  listAllEditors,
  slugify,
  uploadImage,
  type CmsArticle,
  type Editor,
} from "@/lib/cms-client";

type SessionInfo = {
  authenticated: boolean;
  role: "admin" | "writer";
  name: string | null;
  editorId: string | null;
  editorSlug: string | null;
  canPublish: boolean;
};

const defaultForm = {
  title: "",
  category: "Educational",
  excerpt: "",
  content: "",
  editorId: "",
  tags: "",
  coverImageUrl: "",
  published: true,
};

const blogTypes = [
  "Educational",
  "Historical",
  "Theology",
  "Prayer Life",
  "Church Life",
  "Saints",
  "Apologetics",
  "Testimony",
  "Community",
];

export default function SanctuaryBlogsPage() {
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [articles, setArticles] = useState<CmsArticle[]>([]);
  const [editors, setEditors] = useState<Editor[]>([]);
  const [form, setForm] = useState(defaultForm);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const isWriter = session?.role === "writer";

  const managedArticles = useMemo(() => {
    if (!isWriter || !session?.editorId) return articles;
    return articles.filter((article) => article.editor_id === session.editorId);
  }, [articles, isWriter, session?.editorId]);

  useEffect(() => {
    async function load() {
      if (!isCmsConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const sessionRes = await fetch("/api/auth/admin", { cache: "no-store" });
        if (!sessionRes.ok) throw new Error("Unauthorized session.");
        const sessionData = (await sessionRes.json()) as SessionInfo;
        setSession(sessionData);

        const [allEditors, allArticles] = await Promise.all([listAllEditors(), listAllArticles()]);
        setEditors(allEditors);
        setArticles(allArticles);

        if (sessionData.role === "writer" && sessionData.editorId) {
          setForm((prev) => ({
            ...prev,
            editorId: sessionData.editorId ?? "",
            published: sessionData.canPublish ? prev.published : false,
          }));
        }
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Failed to load blog manager.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function canManageArticle(article: CmsArticle) {
    if (session?.role === "admin") return true;
    return session?.role === "writer" && Boolean(session.editorId && article.editor_id === session.editorId);
  }

  function resetForm() {
    setEditingId(null);
    setCoverImageFile(null);
    setForm((prev) => ({
      ...defaultForm,
      editorId: isWriter ? session?.editorId ?? "" : "",
    }));
  }

  async function refreshArticles() {
    const allArticles = await listAllArticles();
    setArticles(allArticles);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      const generatedSlug = slugify(form.title);
      if (!generatedSlug) throw new Error("Title must contain letters or numbers.");

      const editorId = isWriter ? session?.editorId ?? null : form.editorId || null;
      if (isWriter && !editorId) {
        throw new Error("Your editor account is not linked to an editor profile.");
      }

      const tags = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (form.published) {
        if (form.excerpt.trim().length < 30) {
          throw new Error("Excerpt must be at least 30 characters before publishing.");
        }
        if (form.content.trim().length < 120) {
          throw new Error("Content must be at least 120 characters before publishing.");
        }
        if (tags.length === 0) {
          throw new Error("Add at least one tag before publishing.");
        }
      }

      let coverImageUrl = form.coverImageUrl.trim() || null;
      if (coverImageFile) {
        const ext = coverImageFile.name.split(".").pop() ?? "jpg";
        const fileName = `${generatedSlug}-${Date.now()}.${ext}`;
        coverImageUrl = await uploadImage("blog-images", fileName, coverImageFile);
      }

      const publishState = isWriter && session?.canPublish === false ? false : form.published;

      const current = editingId ? articles.find((article) => article.id === editingId) : null;
      if (editingId && (!current || !canManageArticle(current))) {
        throw new Error("You do not have permission to edit this blog post.");
      }

      const res = await fetch("/api/sanctuary/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: editingId ? "update" : "create",
          blog: {
            id: editingId ?? undefined,
            title: form.title.trim(),
            slug: generatedSlug,
            category: form.category.trim(),
            excerpt: form.excerpt.trim(),
            content: form.content.trim(),
            editor_id: editorId,
            tags,
            cover_image_url: coverImageUrl,
            published: publishState,
          },
        }),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.error ?? "Failed to save blog post.");
      }

      setStatus(editingId ? "Blog post updated." : "Blog post created.");

      resetForm();
      await refreshArticles();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(article: CmsArticle) {
    if (!canManageArticle(article)) return;
    setEditingId(article.id);
    setCoverImageFile(null);
    setForm({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      editorId: article.editor_id ?? "",
      tags: article.tags.join(", "),
      coverImageUrl: article.cover_image_url ?? "",
      published: article.published,
    });
  }

  async function handleDelete(article: CmsArticle) {
    if (!canManageArticle(article)) return;
    if (!confirm("Delete this blog post?")) return;

    try {
      const res = await fetch("/api/sanctuary/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: article.id }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) throw new Error(payload?.error ?? "Failed to delete blog post.");

      setStatus("Blog post deleted.");
      await refreshArticles();
      if (editingId === article.id) resetForm();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to delete blog post.");
    }
  }

  async function handleReorder(articleId: string, direction: "up" | "down") {
    if (session?.role !== "admin") return;

    const currentIndex = articles.findIndex((article) => article.id === articleId);
    if (currentIndex < 0) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= articles.length) return;

    const reordered = [...articles];
    const [moved] = reordered.splice(currentIndex, 1);
    reordered.splice(targetIndex, 0, moved);

    setReordering(articleId);
    setStatus(null);
    setArticles(reordered);

    try {
      const res = await fetch("/api/sanctuary/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "reorder",
          order: reordered.map((article) => article.id),
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) throw new Error(payload?.error ?? "Failed to reorder blog posts.");

      setStatus("Blog order updated.");
      await refreshArticles();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to reorder blog posts.");
      await refreshArticles();
    } finally {
      setReordering(null);
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">Blog Studio</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Create blog posts, add images, and organize by type/author.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-cream)]">
              {session?.role === "writer" ? "Editor Access" : "Admin Access"}
            </span>
            {session?.role === "writer" && (
              <Link href="/sanctuary/profile" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
                Edit Profile
              </Link>
            )}
            <Link href="/sanctuary" className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm">
              Back to Sanctuary
            </Link>
          </div>
        </div>

        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">
            {editingId ? "Edit Blog Post" : "Write New Blog Post"}
          </h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
              required
            />
            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white"
              >
                {blogTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {isWriter ? (
                <input
                  value={editors.find((editor) => editor.id === session?.editorId)?.name ?? session?.name ?? ""}
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-gray-50"
                  disabled
                />
              ) : (
                <select
                  value={form.editorId}
                  onChange={(e) => setForm((prev) => ({ ...prev, editorId: e.target.value }))}
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)] bg-white"
                >
                  <option value="">Unassigned author</option>
                  {editors.map((editor) => (
                    <option key={editor.id} value={editor.id}>
                      {editor.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <input
              value={form.tags}
              onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="Tags (comma separated)"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
            />
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Excerpt"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[100px]"
              required
            />
            <textarea
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Blog body (Markdown-style text supported)"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[280px]"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[var(--color-text-muted)] block mb-1">Cover image file</label>
                <input type="file" accept="image/*" onChange={(e) => setCoverImageFile(e.target.files?.[0] ?? null)} />
              </div>
              <div>
                <label className="text-sm text-[var(--color-text-muted)] block mb-1">Cover image URL (optional)</label>
                <input
                  value={form.coverImageUrl}
                  onChange={(e) => setForm((prev) => ({ ...prev, coverImageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))}
                disabled={isWriter && session?.canPublish === false}
              />
              Published {isWriter && session?.canPublish === false ? "(Admin approval required)" : ""}
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={saving || loading}
                className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : editingId ? "Update Blog Post" : "Create Blog Post"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 rounded-lg border border-[var(--color-border)]"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-serif text-xl font-semibold mb-4">
            {isWriter ? "Your Blog Posts" : "All Blog Posts"}
          </h2>
          {loading ? (
            <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
          ) : managedArticles.length === 0 ? (
            <p className="text-sm text-[var(--color-text-muted)]">No blog posts yet.</p>
          ) : (
            <div className="space-y-3">
              {managedArticles.map((article) => (
                <div key={article.id} className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {article.category} &middot; {article.editors?.name ?? "Unassigned"} &middot; /blog/{article.slug}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/blog/${article.slug}`} className="text-sm hover:underline" target="_blank">
                        View
                      </Link>
                      {session?.role === "admin" && (
                        <>
                          <button
                            onClick={() => handleReorder(article.id, "up")}
                            disabled={reordering === article.id || managedArticles[0]?.id === article.id}
                            className="text-sm text-[var(--color-text-muted)] hover:underline disabled:opacity-40"
                          >
                            Move Up
                          </button>
                          <button
                            onClick={() => handleReorder(article.id, "down")}
                            disabled={
                              reordering === article.id ||
                              managedArticles[managedArticles.length - 1]?.id === article.id
                            }
                            className="text-sm text-[var(--color-text-muted)] hover:underline disabled:opacity-40"
                          >
                            Move Down
                          </button>
                        </>
                      )}
                      <button onClick={() => startEdit(article)} className="text-sm text-[var(--color-primary)] hover:underline">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(article)} className="text-sm text-red-700 hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {status && <p className="mt-4 text-sm text-[var(--color-text-muted)]">{status}</p>}
      </div>
    </div>
  );
}
