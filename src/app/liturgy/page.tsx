"use client";

import { useState } from "react";
import { Church } from "lucide-react";
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

export default function LiturgyPage() {
  const [lang, setLang] = useState<Language>("english");

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

        {/* Liturgy Sections */}
        <div className="space-y-8">
          {liturgySections.map((section) => (
            <div
              key={section.id}
              className="border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              <div className="bg-white p-6 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif text-xl font-semibold">
                    {section.title}
                  </h3>
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                      roleColors[section.role]
                    }`}
                  >
                    {section.role}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {section.description}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
