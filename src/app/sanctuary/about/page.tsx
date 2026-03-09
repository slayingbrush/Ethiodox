"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSitePage, isCmsConfigured, upsertSitePage } from "@/lib/cms-client";
import { ABOUT_FALLBACK_CONTENT, ABOUT_FALLBACK_TITLE } from "@/data/site-pages";

export default function SanctuaryAboutPage() {
  const [title, setTitle] = useState(ABOUT_FALLBACK_TITLE);
  const [content, setContent] = useState(ABOUT_FALLBACK_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    async function loadPage() {
      if (!isCmsConfigured()) {
        setLoading(false);
        return;
      }

      try {
        const page = await getSitePage("about");
        if (page) {
          setTitle(page.title || ABOUT_FALLBACK_TITLE);
          setContent(page.content || ABOUT_FALLBACK_CONTENT);
        }
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "Failed to load About page.");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      await upsertSitePage("about", {
        title: title.trim() || ABOUT_FALLBACK_TITLE,
        content: content.trim() || ABOUT_FALLBACK_CONTENT,
      });
      setStatus("About page saved.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to save About page.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[var(--color-primary)]">Edit About Page</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-2">
              Use Markdown-style formatting (headings, bullets, bold/italic).
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/sanctuary"
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm"
            >
              Back to Sanctuary
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm"
              target="_blank"
            >
              View About Page
            </Link>
          </div>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-[var(--color-border)] rounded-xl p-6 grid gap-4">
          <div>
            <label className="text-sm text-[var(--color-text-muted)] block mb-1">Page Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
              required
            />
          </div>

          <div>
            <label className="text-sm text-[var(--color-text-muted)] block mb-1">Page Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] min-h-[420px] font-mono text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving || loading}
            className="w-fit px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save About Page"}
          </button>
        </form>

        {status && <p className="mt-4 text-sm text-[var(--color-text-muted)]">{status}</p>}
      </div>
    </div>
  );
}
