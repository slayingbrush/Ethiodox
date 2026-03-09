import type { Metadata } from "next";
import LiveUpdatesFeed from "@/components/updates/LiveUpdatesFeed";

export const metadata: Metadata = {
  title: "Site Updates",
  description:
    "Latest updates to prayers, liturgy, theology modules, and content improvements.",
};

export default function UpdatesPage() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-3">
            Site Updates
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            Track new content, corrections, and major additions across the site.
          </p>
        </div>
        <LiveUpdatesFeed />
      </div>
    </div>
  );
}
