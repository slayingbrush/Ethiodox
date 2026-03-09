"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { prayers, getPrayer } from "@/data/prayers";
import { notFound } from "next/navigation";
import { use } from "react";

type Language = "english" | "amharicTransliteration" | "amharic" | "geez";

const languages: { key: Language; label: string }[] = [
  { key: "english", label: "English" },
  { key: "amharicTransliteration", label: "Amharic (Transliteration)" },
  { key: "amharic", label: "Amharic" },
  { key: "geez", label: "Ge'ez" },
];

export default function PrayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const prayer = getPrayer(slug);
  const [lang, setLang] = useState<Language>("english");

  if (!prayer) notFound();

  const currentIndex = prayers.findIndex((p) => p.slug === slug);
  const relatedPrayers = prayers
    .filter((p) => p.category === prayer.category && p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/prayers"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Prayer Library
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">
            {prayer.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-2 mb-4">
            {prayer.title}
          </h1>
        </div>

        {/* Language Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {languages.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                lang === l.key
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-cream)] text-[var(--color-text-muted)] hover:bg-[var(--color-cream-dark)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Prayer Text */}
        <div className="bg-[var(--color-cream)] rounded-xl p-8 mb-8">
          <div
            className={`prayer-text ${
              lang === "geez" ? "prayer-text-geez" : ""
            }`}
          >
            {prayer[lang]}
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold mb-3">
            About This Prayer
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {prayer.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {prayer.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5 bg-[var(--color-cream)] rounded-lg text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Prayers */}
        {relatedPrayers.length > 0 && (
          <div className="pt-8 border-t border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-semibold mb-4">
              Related Prayers
            </h3>
            <div className="grid gap-4">
              {relatedPrayers.map((p) => (
                <Link
                  key={p.slug}
                  href={`/prayers/${p.slug}`}
                  className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-1">
                    {p.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
