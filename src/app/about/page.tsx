import { Cross } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getSitePage, isCmsConfigured } from "@/lib/cms-client";
import { renderRichText } from "@/lib/rich-text";
import { ABOUT_FALLBACK_CONTENT, ABOUT_FALLBACK_TITLE } from "@/data/site-pages";

export const metadata: Metadata = {
  title: "About Ethiodox",
  description: "Ethiodox is a modern web platform dedicated to teaching the Ethiopian Orthodox Tewahedo faith in depth.",
};

async function loadAboutPage() {
  if (!isCmsConfigured()) {
    return { title: ABOUT_FALLBACK_TITLE, content: ABOUT_FALLBACK_CONTENT, updatedAt: null as string | null };
  }

  try {
    const page = await getSitePage("about");
    if (!page) {
      return { title: ABOUT_FALLBACK_TITLE, content: ABOUT_FALLBACK_CONTENT, updatedAt: null as string | null };
    }

    return {
      title: page.title || ABOUT_FALLBACK_TITLE,
      content: page.content || ABOUT_FALLBACK_CONTENT,
      updatedAt: page.updated_at ?? null,
    };
  } catch {
    return { title: ABOUT_FALLBACK_TITLE, content: ABOUT_FALLBACK_CONTENT, updatedAt: null as string | null };
  }
}

export default async function AboutPage() {
  const about = await loadAboutPage();

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Cross className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            {about.title}
          </h1>
          {about.updatedAt && (
            <p className="text-sm text-[var(--color-text-muted)]">
              Last updated{" "}
              {new Date(about.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        <div className="prose mb-12">{renderRichText(about.content)}</div>

        <div className="bg-[var(--color-primary)] text-white rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Begin Your Journey</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Whether you are rediscovering your faith or exploring Orthodoxy for the first time, Ethiodox is here to
            guide you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learn"
              className="px-6 py-3 bg-[var(--color-gold)] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/prayers"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Explore Prayers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
