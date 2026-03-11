import Link from "next/link";
import { Newspaper } from "lucide-react";
import { blogPosts as fallbackBlogPosts } from "@/data/blog";
import { isCmsConfigured, listPublishedArticles } from "@/lib/cms-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Educational, historical, theological, and practical blog posts for Orthodox life.",
};

type SearchParams = Promise<{
  type?: string;
  author?: string;
}>;

type BlogCard = {
  id: string;
  slug: string;
  title: string;
  type: string;
  excerpt: string;
  tags: string[];
  createdAt: string;
  displayOrder: number;
  coverImageUrl: string | null;
  authorName: string;
  authorSlug: string;
};

const suggestedBlogTypes = [
  "Educational",
  "Historical",
  "Theology",
  "Prayer Life",
  "Church Life",
  "Saints",
  "Apologetics",
  "Testimony",
];

async function loadBlogs(): Promise<BlogCard[]> {
  if (!isCmsConfigured()) {
    return fallbackBlogPosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      type: post.category,
      excerpt: post.excerpt,
      tags: post.tags,
      createdAt: post.date,
      displayOrder: 0,
      coverImageUrl: null,
      authorName: post.author,
      authorSlug: post.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
  }

  try {
    const rows = await listPublishedArticles();
    return rows.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      type: post.category,
      excerpt: post.excerpt,
      tags: post.tags,
      createdAt: post.created_at,
      displayOrder: post.display_order ?? 0,
      coverImageUrl: post.cover_image_url,
      authorName: post.editors?.name ?? "Ethiodox Team",
      authorSlug: post.editors?.slug ?? "ethiodox-team",
    }));
  } catch {
    return [];
  }
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const [{ type, author }, allBlogs] = await Promise.all([searchParams, loadBlogs()]);

  const types = Array.from(new Set([...suggestedBlogTypes, ...allBlogs.map((post) => post.type)])).sort((a, b) =>
    a.localeCompare(b)
  );
  const authors = Array.from(
    allBlogs.reduce((acc, post) => acc.set(post.authorSlug, post.authorName), new Map<string, string>()),
    ([slug, name]) => ({ slug, name })
  ).sort((a, b) => a.name.localeCompare(b.name));

  const filteredBlogs = allBlogs
    .filter((post) => (type ? post.type === type : true))
    .filter((post) => (author ? post.authorSlug === author : true))
    .sort((a, b) => (b.displayOrder - a.displayOrder) || (+new Date(b.createdAt) - +new Date(a.createdAt)));

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">Blog</h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Educational, historical, and practical posts for living the Orthodox faith.
          </p>
        </div>

        <form className="grid md:grid-cols-[1fr_1fr_auto_auto] gap-3 mb-8 bg-white border border-[var(--color-border)] rounded-xl p-4">
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Type</label>
            <select
              name="type"
              defaultValue={type ?? ""}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
            >
              <option value="">All types</option>
              {types.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {typeOption}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Author</label>
            <select
              name="author"
              defaultValue={author ?? ""}
              className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--color-border)] text-sm bg-white"
            >
              <option value="">All authors</option>
              {authors.map((authorOption) => (
                <option key={authorOption.slug} value={authorOption.slug}>
                  {authorOption.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="self-end px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm">
            Apply
          </button>
          <Link href="/blog" className="self-end px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm text-center">
            Reset
          </Link>
        </form>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing {filteredBlogs.length} blog post{filteredBlogs.length === 1 ? "" : "s"}
          </p>
          <Link href="/editors" className="text-sm text-[var(--color-primary)] hover:underline">
            Browse editors
          </Link>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-8 text-center">
            <p className="text-[var(--color-text-muted)]">No blog posts match the selected filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
              >
                {post.coverImageUrl && <img src={post.coverImageUrl} alt={post.title} className="w-full h-44 object-cover" />}
                <div className={post.coverImageUrl ? "p-5" : "p-6"}>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">{post.type}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">by {post.authorName}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
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
        )}

      </div>
    </div>
  );
}
