"use client";

import { useEffect, useMemo, useState } from "react";
import { listPageViews, type PageViewEvent, isCmsConfigured } from "@/lib/cms-client";

type Range = 7 | 30 | 90;

function aggregateTop(items: string[], limit = 8) {
  const map = new Map<string, number>();
  for (const item of items) {
    const key = item || "(direct)";
    map.set(key, (map.get(key) ?? 0) + 1);
  }
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
}

export default function AnalyticsPanel() {
  const [range, setRange] = useState<Range>(30);
  const [events, setEvents] = useState<PageViewEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isCmsConfigured()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    listPageViews(range)
      .then(setEvents)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load analytics."))
      .finally(() => setLoading(false));
  }, [range]);

  const uniqueSessions = useMemo(
    () => new Set(events.map((event) => event.session_id)).size,
    [events]
  );
  const topPages = useMemo(
    () => aggregateTop(events.map((event) => event.path)),
    [events]
  );
  const topReferrers = useMemo(
    () => aggregateTop(events.map((event) => event.referrer || "(direct)"), 6),
    [events]
  );

  if (!isCmsConfigured()) {
    return (
      <div className="bg-[var(--color-cream)] border border-[var(--color-border)] rounded-xl p-6">
        <h2 className="font-serif text-xl font-semibold mb-2">Analytics Not Configured</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to enable real analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)]">Analytics Dashboard</h2>
        <div className="flex gap-2">
          {[7, 30, 90].map((days) => (
            <button
              key={days}
              onClick={() => setRange(days as Range)}
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                range === days
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-white text-[var(--color-text-muted)] border-[var(--color-border)]"
              }`}
            >
              {days}d
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-[var(--color-text-muted)]">Loading analytics...</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Page Views</p>
              <p className="text-2xl font-semibold mt-1">{events.length}</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Unique Sessions</p>
              <p className="text-2xl font-semibold mt-1">{uniqueSessions}</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Top Page</p>
              <p className="text-sm font-medium mt-2 line-clamp-2">{topPages[0]?.[0] ?? "n/a"}</p>
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">Top Referrer</p>
              <p className="text-sm font-medium mt-2 line-clamp-2">{topReferrers[0]?.[0] ?? "n/a"}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <h3 className="font-serif text-lg font-semibold mb-3">Top Pages</h3>
              <ul className="space-y-2">
                {topPages.length === 0 && (
                  <li className="text-sm text-[var(--color-text-muted)]">No data yet.</li>
                )}
                {topPages.map(([path, count]) => (
                  <li key={path} className="flex justify-between gap-4 text-sm">
                    <span className="truncate">{path}</span>
                    <span className="font-medium">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
              <h3 className="font-serif text-lg font-semibold mb-3">Top Referrers</h3>
              <ul className="space-y-2">
                {topReferrers.length === 0 && (
                  <li className="text-sm text-[var(--color-text-muted)]">No data yet.</li>
                )}
                {topReferrers.map(([referrer, count]) => (
                  <li key={referrer} className="flex justify-between gap-4 text-sm">
                    <span className="truncate">{referrer}</span>
                    <span className="font-medium">{count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-xl p-4">
            <h3 className="font-serif text-lg font-semibold mb-3">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-[var(--color-text-muted)]">
                    <th className="pb-2 pr-4">Time</th>
                    <th className="pb-2 pr-4">Path</th>
                    <th className="pb-2 pr-4">Session</th>
                  </tr>
                </thead>
                <tbody>
                  {events.slice(0, 20).map((event) => (
                    <tr key={event.id} className="border-t border-[var(--color-border)]">
                      <td className="py-2 pr-4 whitespace-nowrap">
                        {new Date(event.created_at).toLocaleString()}
                      </td>
                      <td className="py-2 pr-4">{event.path}</td>
                      <td className="py-2 pr-4 font-mono text-xs">{event.session_id}</td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-4 text-[var(--color-text-muted)]">
                        No events yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
