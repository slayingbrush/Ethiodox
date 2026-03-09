"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error ?? "Subscription failed.");

      setStatus("Subscribed. You will receive new blog posts by email.");
      setEmail("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Failed to subscribe.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-12 bg-white border border-[var(--color-border)] rounded-xl p-6">
      <h2 className="font-serif text-2xl font-semibold mb-2">Email Blog Letter</h2>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        Subscribe to get new blog posts delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 px-3 py-2 rounded-lg border border-[var(--color-border)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white disabled:opacity-60"
        >
          {submitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status && <p className="text-sm text-[var(--color-text-muted)] mt-3">{status}</p>}
    </section>
  );
}
