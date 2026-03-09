"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  createBlogPost,
  createSiteUpdate,
  deleteBlogPost,
  deleteSiteUpdate,
  isCmsConfigured,
  listAllBlogPosts,
  listAllSiteUpdates,
  slugify,
  type LiveBlogPost,
  type SiteUpdate,
} from "@/lib/cms-client";

const ADMIN_AUTH_KEY = "ethiodox_admin_authenticated";

const defaultBlogForm = {
  title: "",
  category: "Orthodox Life",
  excerpt: "",
  content: "",
  author: "Ethiodox Team",
  tags: "",
  published: true,
};

const defaultUpdateForm = {
  title: "",
  section: "General",
  content: "",
  published: true,
};

export default function AdminPage() {
  const [passcodeInput, setPasscodeInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [blogForm, setBlogForm] = useState(defaultBlogForm);
  const [updateForm, setUpdateForm] = useState(defaultUpdateForm);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [blogPosts, setBlogPosts] = useState<LiveBlogPost[]>([]);
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const envPasscode = process.env.NEXT_PUBLIC_ADMIN_PASSCODE ?? "";
  const cmsConfigured = isCmsConfigured();
  const setupWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (!cmsConfigured) warnings.push("Missing Supabase environment variables.");
    if (!envPasscode) warnings.push("Missing NEXT_PUBLIC_ADMIN_PASSCODE.");
    return warnings;
  }, [cmsConfigured, envPasscode]);

  async function loadData() {
    if (!cmsConfigured || !isAuthed) {
      setLoadingData(false);
      return;
    }

    setLoadingData(true);
    try {
      const [liveBlogs, liveUpdates] = await Promise.all([
        listAllBlogPosts(),
        listAllSiteUpdates(),
      ]);
      setBlogPosts(liveBlogs);
      setUpdates(liveUpdates);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to load admin data.");
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem(ADMIN_AUTH_KEY) === "true") {
      setIsAuthed(true);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthed, cmsConfigured]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!envPasscode) {
      setAuthError("Set NEXT_PUBLIC_ADMIN_PASSCODE to enable admin login.");
      return;
    }
    if (passcodeInput !== envPasscode) {
      setAuthError("Incorrect passcode.");
      return;
    }
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
    setIsAuthed(true);
    setAuthError(null);
    setPasscodeInput("");
  }

  function handleLogout() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthed(false);
  }

  async function handleCreateBlog(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const slug = slugify(blogForm.title);
      if (!slug) throw new Error("Title must contain letters or numbers.");
      await createBlogPost({
        title: blogForm.title.trim(),
        slug,
        category: blogForm.category.trim() || "Orthodox Life",
        excerpt: blogForm.excerpt.trim(),
        content: blogForm.content.trim(),
        author: blogForm.author.trim() || "Ethiodox Team",
        tags: blogForm.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        published: blogForm.published,
      });
      setBlogForm(defaultBlogForm);
      setStatus("Blog post published.");
      await loadData();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to create blog post.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateUpdate(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await createSiteUpdate({
        title: updateForm.title.trim(),
        section: updateForm.section.trim() || "General",
        content: updateForm.content.trim(),
        published: updateForm.published,
      });
      setUpdateForm(defaultUpdateForm);
      setStatus("Site update published.");
      await loadData();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to create site update.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteBlog(id: string) {
    if (!confirm("Delete this live blog post?")) return;
    setStatus(null);
    try {
      await deleteBlogPost(id);
      setStatus("Blog post deleted.");
      await loadData();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to delete post.");
    }
  }

  async function handleDeleteUpdate(id: string) {
    if (!confirm("Delete this site update?")) return;
    setStatus(null);
    try {
      await deleteSiteUpdate(id);
      setStatus("Site update deleted.");
      await loadData();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to delete update.");
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">Admin Control</h1>
            <p className="text-[var(--color-text-muted)] mt-2">
              Manage live blog posts, site updates, and analytics access from one place.
            </p>
          </div>
          {isAuthed && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            >
              Log out
            </button>
          )}
        </div>

        {setupWarnings.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl p-4">
            <p className="font-medium mb-1">Setup needed</p>
            <ul className="list-disc ml-5 text-sm space-y-1">
              {setupWarnings.map((warning) => (
                <li key={warning}>{warning}</li>
              ))}
            </ul>
            <p className="text-sm mt-2">
              See <code>docs/admin_analytics_setup.md</code> for SQL + environment setup.
            </p>
          </div>
        )}

        {!isAuthed ? (
          <form
            onSubmit={handleLogin}
            className="max-w-md bg-white border border-[var(--color-border)] rounded-xl p-6"
          >
            <h2 className="font-serif text-2xl font-semibold mb-3">Admin Login</h2>
            <label className="text-sm text-[var(--color-text-muted)]">Passcode</label>
            <input
              type="password"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
            />
            {authError && <p className="text-sm text-red-700 mt-2">{authError}</p>}
            <button
              type="submit"
              className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            >
              Unlock Admin
            </button>
          </form>
        ) : (
          <div className="space-y-10">
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="font-serif text-2xl font-semibold">Analytics</h2>
                <Link
                  href="/admin/analytics"
                  className="px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white text-sm"
                >
                  Open Dashboard
                </Link>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                View user sessions, top pages, and recent traffic in the analytics dashboard.
              </p>
            </div>

            <section className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Create Live Blog Post</h2>
              <form onSubmit={handleCreateBlog} className="grid gap-4">
                <input
                  value={blogForm.title}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Title"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                  required
                />
                <input
                  value={blogForm.category}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="Category"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                  required
                />
                <input
                  value={blogForm.author}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, author: e.target.value }))}
                  placeholder="Author"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                  required
                />
                <input
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="Tags (comma separated)"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                />
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Excerpt"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[90px]"
                  required
                />
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="Full content"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[220px]"
                  required
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={blogForm.published}
                    onChange={(e) => setBlogForm((prev) => ({ ...prev, published: e.target.checked }))}
                  />
                  Publish immediately
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-fit px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Publish Blog Post"}
                </button>
              </form>
            </section>

            <section className="bg-white border border-[var(--color-border)] rounded-xl p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Create Site Update</h2>
              <form onSubmit={handleCreateUpdate} className="grid gap-4">
                <input
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Update title"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                  required
                />
                <input
                  value={updateForm.section}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, section: e.target.value }))}
                  placeholder="Section (e.g. Liturgy, Prayers, Learn)"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)]"
                  required
                />
                <textarea
                  value={updateForm.content}
                  onChange={(e) => setUpdateForm((prev) => ({ ...prev, content: e.target.value }))}
                  placeholder="What changed?"
                  className="px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[140px]"
                  required
                />
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={updateForm.published}
                    onChange={(e) => setUpdateForm((prev) => ({ ...prev, published: e.target.checked }))}
                  />
                  Publish immediately
                </label>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-fit px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Publish Update"}
                </button>
              </form>
            </section>

            <section className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Live Blog Posts</h2>
                {loadingData ? (
                  <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
                ) : blogPosts.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-muted)]">No live posts yet.</p>
                ) : (
                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <div key={post.id} className="border border-[var(--color-border)] rounded-lg p-3">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">{post.slug}</p>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="mt-2 text-sm text-red-700 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                <h2 className="font-serif text-xl font-semibold mb-4">Site Updates</h2>
                {loadingData ? (
                  <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
                ) : updates.length === 0 ? (
                  <p className="text-sm text-[var(--color-text-muted)]">No updates yet.</p>
                ) : (
                  <div className="space-y-3">
                    {updates.map((update) => (
                      <div key={update.id} className="border border-[var(--color-border)] rounded-lg p-3">
                        <p className="font-medium">{update.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-1">{update.section}</p>
                        <button
                          onClick={() => handleDeleteUpdate(update.id)}
                          className="mt-2 text-sm text-red-700 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {status && <p className="mt-6 text-sm text-[var(--color-text-muted)]">{status}</p>}
      </div>
    </div>
  );
}
