import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { blogPosts as fallbackBlogPosts, getBlogPost } from "@/data/blog";
import { getArticleBySlug, isCmsConfigured, listPublishedArticles } from "@/lib/cms-client";
import { renderRichText } from "@/lib/rich-text";

type Props = { params: Promise<{ slug: string }> };

type LoadedBlog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  type: string;
  tags: string[];
  date: string;
  authorName: string;
  authorSlug: string;
  coverImageUrl: string | null;
};

async function loadBlog(slug: string): Promise<LoadedBlog | null> {
  if (!isCmsConfigured()) {
    const fallback = getBlogPost(slug);
    if (!fallback) return null;
    return {
      id: fallback.id,
      slug: fallback.slug,
      title: fallback.title,
      excerpt: fallback.excerpt,
      content: fallback.content,
      type: fallback.category,
      tags: fallback.tags,
      date: fallback.date,
      authorName: fallback.author,
      authorSlug: fallback.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      coverImageUrl: null,
    };
  }

  try {
    const row = await getArticleBySlug(slug);
    if (!row || !row.published) return null;
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      content: row.content,
      type: row.category,
      tags: row.tags,
      date: row.created_at,
      authorName: row.editors?.name ?? "Ethiodox Team",
      authorSlug: row.editors?.slug ?? "ethiodox-team",
      coverImageUrl: row.cover_image_url,
    };
  } catch {
    return null;
  }
}

async function loadRelatedBlogs(post: LoadedBlog): Promise<LoadedBlog[]> {
  if (!isCmsConfigured()) {
    return fallbackBlogPosts
      .filter((item) => item.slug !== post.slug && item.category === post.type)
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        type: item.category,
        tags: item.tags,
        date: item.date,
        authorName: item.author,
        authorSlug: item.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        coverImageUrl: null,
      }));
  }

  try {
    const rows = await listPublishedArticles();
    return rows
      .filter((row) => row.slug !== post.slug && row.category === post.type)
      .slice(0, 3)
      .map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        content: row.content,
        type: row.category,
        tags: row.tags,
        date: row.created_at,
        authorName: row.editors?.name ?? "Ethiodox Team",
        authorSlug: row.editors?.slug ?? "ethiodox-team",
        coverImageUrl: row.cover_image_url,
      }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlog(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await loadBlog(slug);
  if (!post) notFound();

  const relatedBlogs = await loadRelatedBlogs(post);

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {post.coverImageUrl && (
          <img src={post.coverImageUrl} alt={post.title} className="w-full h-auto max-h-[460px] object-cover rounded-xl mb-8" />
        )}

        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">{post.type}</span>
            <span className="text-sm text-[var(--color-text-muted)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <Link href={`/blog?author=${post.authorSlug}`} className="text-sm text-[var(--color-primary)] hover:underline">
              {post.authorName}
            </Link>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">{post.title}</h1>
          <p className="text-lg text-[var(--color-text-muted)]">{post.excerpt}</p>
        </div>

        <div className="prose mb-10">{renderRichText(post.content)}</div>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm px-3 py-1.5 bg-[var(--color-cream)] rounded-lg text-[var(--color-text-muted)]">
              {tag}
            </span>
          ))}
        </div>

        {relatedBlogs.length > 0 && (
          <div className="pt-8 border-t border-[var(--color-border)]">
            <h3 className="font-serif text-xl font-semibold mb-4">Related Blog Posts</h3>
            <div className="grid gap-4">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold">{related.title}</h4>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
