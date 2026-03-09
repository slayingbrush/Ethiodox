"use client";

import { useEffect, useState } from "react";
import { isCmsConfigured, listPublishedSiteUpdates, type SiteUpdate } from "@/lib/cms-client";

export default function LiveUpdatesFeed() {
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isCmsConfigured()) {
      setLoading(false);
      return;
    }
    listPublishedSiteUpdates()
      .then(setUpdates)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load updates."))
      .finally(() => setLoading(false));
  }, []);

  if (!isCmsConfigured()) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        Updates are not configured. Set Supabase environment variables first.
      </p>
    );
  }

  if (loading) return <p className="text-sm text-[var(--color-text-muted)]">Loading updates...</p>;
  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (updates.length === 0) {
    return <p className="text-sm text-[var(--color-text-muted)]">No updates published yet.</p>;
  }

  return (
    <div className="space-y-4">
      {updates.map((update) => (
        <article key={update.id} className="bg-white border border-[var(--color-border)] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs uppercase tracking-wider text-[var(--color-gold)]">
              {update.section}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {new Date(update.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">{update.title}</h3>
          <p className="whitespace-pre-line text-[var(--color-text-muted)]">{update.content}</p>
        </article>
      ))}
    </div>
  );
}
