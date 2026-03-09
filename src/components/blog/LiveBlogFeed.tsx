"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listPublishedBlogPosts, type LiveBlogPost, isCmsConfigured } from "@/lib/cms-client";

export default function LiveBlogFeed() {
  const [posts, setPosts] = useState<LiveBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isCmsConfigured()) {
      setLoading(false);
      return;
    }

    listPublishedBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (!isCmsConfigured()) return null;

  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl font-bold text-[var(--color-primary)] mb-4">
        Latest Admin Posts
      </h2>

      {loading && (
        <p className="text-sm text-[var(--color-text-muted)]">Loading latest posts...</p>
      )}

      {!loading && posts.length === 0 && (
        <p className="text-sm text-[var(--color-text-muted)]">
          No published admin posts yet.
        </p>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/live?id=${post.id}`}
            className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-3 group-hover:text-[var(--color-primary)]">
              {post.title}
            </h3>
            <p className="text-[var(--color-text-muted)] mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-muted)]">By {post.author}</span>
              <span className="text-sm font-medium text-[var(--color-primary)] group-hover:underline">
                Read live post &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
