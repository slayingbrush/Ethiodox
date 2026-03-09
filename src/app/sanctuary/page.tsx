"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isCmsConfigured } from "@/lib/cms-client";

type SessionInfo = {
  authenticated: boolean;
  role: "admin" | "writer";
  name: string | null;
  editorId: string | null;
  editorSlug: string | null;
  canPublish: boolean;
};

export default function SanctuaryHomePage() {
  const [identifier, setIdentifier] = useState("");
  const [passcode, setPasscode] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      if (!isCmsConfigured()) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/admin", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SessionInfo;
        setSession(data);
        setIsAuthed(data.authenticated);
      } finally {
        setAuthLoading(false);
      }
    }

    checkAuth();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, passcode }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Login failed.");
        return;
      }

      const sessionRes = await fetch("/api/auth/admin", { cache: "no-store" });
      if (!sessionRes.ok) throw new Error("Could not load your session.");
      const data = (await sessionRes.json()) as SessionInfo;
      setSession(data);
      setIsAuthed(true);
      setIdentifier("");
      setPasscode("");
    } catch {
      setError("Network error. Please try again.");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/admin", { method: "DELETE" }).catch(() => {});
    setIsAuthed(false);
    setSession(null);
  }

  if (authLoading) {
    return <div className="py-16 text-center text-[var(--color-text-muted)]">Loading...</div>;
  }

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">Sanctuary</h1>
            <p className="text-[var(--color-text-muted)] mt-2">
              Manage About content, editors, and blog publishing access.
            </p>
          </div>
          {isAuthed && (
            <button onClick={handleLogout} className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm">
              Log out
            </button>
          )}
        </div>

        {!isAuthed ? (
          <form onSubmit={handleLogin} className="max-w-md bg-white border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="font-serif text-2xl font-semibold mb-3">Sign in</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Admin: leave username blank and use admin passcode. Editors: enter your username and passcode.
            </p>
            <label className="text-sm text-[var(--color-text-muted)]">Username (editors only)</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
              autoComplete="off"
              placeholder="e.g. selam.editor"
            />

            <label className="text-sm text-[var(--color-text-muted)] block mt-3">Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)]"
              autoComplete="off"
              required
            />

            {error && <p className="text-sm text-red-700 mt-3">{error}</p>}
            <button type="submit" className="mt-4 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white">
              Unlock Sanctuary
            </button>
          </form>
        ) : session?.role === "writer" ? (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-6">
            <h2 className="font-serif text-2xl font-semibold mb-2">Editor Workspace</h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-6">
              Signed in as {session.name ?? "Editor"}. You can create and manage your linked blog posts.
            </p>
            <div className="flex gap-2">
              <Link
                href="/sanctuary/blogs"
                className="inline-flex px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm"
              >
                Open Blog Studio
              </Link>
              <Link href="/sanctuary/profile" className="inline-flex px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm">
                Edit Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/sanctuary/blogs"
              className="block bg-white border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-gold)] transition-colors"
            >
              <h2 className="font-serif text-xl font-semibold mb-1">Blog Studio</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Write, edit, and publish blog posts with cover images, types, and authors.
              </p>
            </Link>

            <Link
              href="/sanctuary/editors"
              className="block bg-white border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-gold)] transition-colors"
            >
              <h2 className="font-serif text-xl font-semibold mb-1">Editors and Access</h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Manage editor profiles and generate unique blog login credentials.
              </p>
            </Link>

            <Link
              href="/sanctuary/about"
              className="block bg-white border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-gold)] transition-colors"
            >
              <h2 className="font-serif text-xl font-semibold mb-1">About Page</h2>
              <p className="text-sm text-[var(--color-text-muted)]">Edit the About page title and content.</p>
            </Link>

            <Link
              href="/sanctuary/analytics"
              className="block bg-white border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-gold)] transition-colors"
            >
              <h2 className="font-serif text-xl font-semibold mb-1">Analytics</h2>
              <p className="text-sm text-[var(--color-text-muted)]">View traffic, sessions, and top pages.</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
