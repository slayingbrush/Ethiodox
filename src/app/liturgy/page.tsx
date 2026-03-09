"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Church, Search, X } from "lucide-react";
import { liturgyIntro, liturgySections } from "@/data/liturgy";

type Language = "english" | "amharicTransliteration" | "amharic" | "geez";

const languages: { key: Language; label: string }[] = [
  { key: "english", label: "English" },
  { key: "amharicTransliteration", label: "Amharic (Transliteration)" },
  { key: "amharic", label: "Amharic" },
  { key: "geez", label: "Ge'ez" },
];

const roleColors: Record<string, string> = {
  priest: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  deacon: "bg-[var(--color-gold)]/20 text-[var(--color-gold)]",
  congregation: "bg-green-50 text-green-700",
  all: "bg-blue-50 text-blue-700",
};

const verificationColors = {
  reviewed: "bg-emerald-50 text-emerald-700",
  needs_review: "bg-amber-50 text-amber-700",
};

export default function LiturgyPage() {
  const [lang, setLang] = useState<Language>("english");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredSections = [...liturgySections]
    .sort((a, b) => a.order - b.order)
    .filter((section) => {
      if (!normalizedQuery) return true;
      const haystack = [
        section.title,
        section.description,
        section.english,
        section.amharicTransliteration,
        section.amharic,
        section.geez,
        section.scriptureRefs.join(" "),
        section.studyNotes.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Church className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              {liturgyIntro.title}
            </h1>
          </div>
          <div className="prose">
            {liturgyIntro.description.split("\n\n").map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: p.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
            ))}
          </div>
        </div>

        {/* Structure Overview */}
        <div className="bg-[var(--color-cream)] rounded-xl p-8 mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">
            Structure of the Divine Liturgy
          </h2>
          <div className="space-y-4">
            {liturgyIntro.structure.map((section, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{section.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accuracy Policy */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-6 mb-8">
          <h2 className="font-serif text-xl font-semibold mb-4">
            Accuracy and Text Review
          </h2>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {liturgyIntro.accuracyPolicy.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Search Divine Liturgy Sections
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by prayer text, section name, scripture, or study note..."
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-white text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-2">
            Showing {filteredSections.length} of {liturgySections.length} sections
          </p>
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

        {/* Section Navigator */}
        {filteredSections.length > 0 && (
          <div className="mb-8 bg-[var(--color-cream)] rounded-xl p-5">
            <h3 className="font-semibold mb-3">Section-by-Section Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {filteredSections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)]"
                >
                  {section.order}. {section.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Liturgy Sections */}
        <div className="space-y-8">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              <div className="bg-white p-6 border-b border-[var(--color-border)]">
                <div className="flex items-start justify-between mb-2 gap-3">
                  <h3 className="font-serif text-xl font-semibold">
                    {section.order}. {section.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                        roleColors[section.role]
                      }`}
                    >
                      {section.role}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${
                        verificationColors[section.verificationStatus]
                      }`}
                    >
                      {section.verificationStatus === "reviewed" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {section.verificationStatus === "reviewed"
                        ? "Reviewed"
                        : "Needs Review"}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {section.description}
                </p>
                <p className="text-xs mt-3 text-[var(--color-text-muted)]">
                  Scripture: {section.scriptureRefs.join(" • ")}
                </p>
              </div>
              <div className="bg-[var(--color-cream)] p-6">
                <div
                  className={`prayer-text ${
                    lang === "geez" ? "prayer-text-geez" : ""
                  }`}
                >
                  {section[lang]}
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--color-border)]/60">
                  <h4 className="text-sm font-semibold mb-2">Study Notes</h4>
                  <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
                    {section.studyNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center">
              <p className="font-medium">No sections matched your search.</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-2">
                Try searching for terms like <span className="font-medium">Our Father</span>,
                <span className="font-medium"> Hail Mary</span>, or
                <span className="font-medium"> Sanctus</span>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
