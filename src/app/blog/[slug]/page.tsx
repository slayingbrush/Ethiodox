import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc">
          {listItems.map((item, i) => (
            <li
              key={i}
              dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\*(.+?)\*/g, "<em>$1</em>"),
              }}
            />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={`h2-${elements.length}`}>{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={`h3-${elements.length}`}>{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      listItems.push(trimmed.slice(2));
    } else if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          dangerouslySetInnerHTML={{
            __html: trimmed
              .slice(2)
              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.+?)\*/g, "<em>$1</em>"),
          }}
        />
      );
    } else if (trimmed === "---") {
      flushList();
      elements.push(<hr key={`hr-${elements.length}`} className="my-8 border-[var(--color-border)]" />);
    } else {
      flushList();
      elements.push(
        <p
          key={`p-${elements.length}`}
          dangerouslySetInnerHTML={{
            __html: trimmed
              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.+?)\*/g, "<em>$1</em>"),
          }}
        />
      );
    }
  }
  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            By {post.author}
          </p>
        </div>

        {/* Content */}
        <div className="prose mb-10">{renderContent(post.content)}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5 bg-[var(--color-cream)] rounded-lg text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Other Posts */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-xl font-semibold mb-4">
            More from the Blog
          </h3>
          <div className="grid gap-4">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
              >
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {p.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
