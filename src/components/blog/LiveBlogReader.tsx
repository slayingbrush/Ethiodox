"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { listPublishedBlogPosts, type LiveBlogPost, isCmsConfigured } from "@/lib/cms-client";

export default function LiveBlogReader() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [posts, setPosts] = useState<LiveBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isCmsConfigured()) {
      setLoading(false);
      return;
    }
    listPublishedBlogPosts()
      .then(setPosts)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load post."))
      .finally(() => setLoading(false));
  }, []);

  const selected = useMemo(
    () => posts.find((post) => post.id === postId) ?? posts[0],
    [posts, postId]
  );

  if (!isCmsConfigured()) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        Live blog is not configured. Set Supabase environment variables first.
      </p>
    );
  }

  if (loading) return <p className="text-sm text-[var(--color-text-muted)]">Loading post...</p>;
  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!selected) return <p className="text-sm text-[var(--color-text-muted)]">No post found.</p>;

  const related = posts.filter((post) => post.id !== selected.id).slice(0, 6);

  return (
    <div className="space-y-8">
      <article className="bg-white border border-[var(--color-border)] rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
            {selected.category}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {new Date(selected.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-3">
          {selected.title}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">By {selected.author}</p>
        <div className="whitespace-pre-line leading-relaxed text-[var(--color-text)]">
          {selected.content}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-white border border-[var(--color-border)] rounded-xl p-6">
          <h2 className="font-serif text-xl font-semibold mb-4">More Live Posts</h2>
          <div className="space-y-3">
            {related.map((post) => (
              <Link
                key={post.id}
                href={`/blog/live?id=${post.id}`}
                className="block p-3 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-gold)]"
              >
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
