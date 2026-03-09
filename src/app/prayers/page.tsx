import Link from "next/link";
import { HandHelping } from "lucide-react";
import { prayers, getPrayersByCategory } from "@/data/prayers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prayer Library",
  description: "Orthodox prayers in English, Amharic transliteration, Amharic script, and Ge'ez.",
};

export default function PrayersPage() {
  const categories = getPrayersByCategory();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <HandHelping className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Prayer Library
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            A collection of Orthodox prayers available in English, Amharic
            transliteration, Amharic script, and Ge&apos;ez. Click any prayer to
            view it in all languages.
          </p>
        </div>

        {/* Prayers by Category */}
        {Object.entries(categories).map(([category, categoryPrayers]) => (
          <div key={category} className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-text)] mb-6 pb-2 border-b border-[var(--color-border)]">
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPrayers.map((prayer) => (
                <Link
                  key={prayer.slug}
                  href={`/prayers/${prayer.slug}`}
                  className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
                >
                  <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {prayer.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-3">
                    {prayer.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {prayer.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-[var(--color-cream)] rounded text-[var(--color-text-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
