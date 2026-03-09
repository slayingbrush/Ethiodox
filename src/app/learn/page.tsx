import Link from "next/link";
import { BookOpen } from "lucide-react";
import { lessons, getLessonsByCategory } from "@/data/lessons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — Orthodox Theology & Practice",
  description:
    "Structured lessons on Ethiopian and Oriental Orthodox theology, church history, Christology, sacraments, and spiritual practice.",
};

export default function LearnPage() {
  const categories = getLessonsByCategory();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Learn
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Explore Ethiopian and Oriental Orthodox theology through structured
            modules, including foundational doctrine, in-depth church history,
            and practical Christian life. Each lesson includes Scripture
            references, common misconceptions addressed, and reflection
            questions.
          </p>
        </div>

        {/* Lessons by Category */}
        {Object.entries(categories).map(([category, categoryLessons]) => (
          <div key={category} className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-[var(--color-text)] mb-6 pb-2 border-b border-[var(--color-border)]">
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryLessons.map((lesson, index) => (
                <Link
                  key={lesson.slug}
                  href={`/learn/${lesson.slug}`}
                  className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl font-serif font-bold text-[var(--color-cream-dark)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs px-2.5 py-1 bg-[var(--color-cream)] rounded-full text-[var(--color-text-muted)]">
                      {lesson.difficulty}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                    {lesson.overview}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
