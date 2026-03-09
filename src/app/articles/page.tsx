import Link from "next/link";
import { FileText } from "lucide-react";
import { articles } from "@/data/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Guides, reflections, and practical resources for Orthodox Christian life.",
};

export default function ArticlesPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Articles
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Practical guides and thoughtful reflections on living the Orthodox
            faith in the modern world.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group block bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
            >
              <div className="h-2 bg-[var(--color-gold)]" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-[var(--color-cream)] rounded text-[var(--color-text-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
