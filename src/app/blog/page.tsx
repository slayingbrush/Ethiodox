import Link from "next/link";
import { Newspaper } from "lucide-react";
import { blogPosts } from "@/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Reflections, faith stories, and guidance for Orthodox life from the Ethiodox community.",
};

export default function BlogPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Blog
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Feast reflections, faith stories, and guidance for living
            Orthodox Christianity in the modern world.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 md:p-8 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                {post.title}
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-muted)]">
                  By {post.author}
                </span>
                <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
