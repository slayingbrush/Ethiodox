import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { articles, getArticle } from "@/data/articles";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushList = () => {
    if (listItems.length > 0 && listType) {
      const Tag = listType;
      elements.push(
        <Tag key={`list-${elements.length}`} className={listType === "ul" ? "list-disc" : "list-decimal"}>
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
        </Tag>
      );
      listItems = [];
      listType = null;
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
      if (listType !== "ul") {
        flushList();
        listType = "ul";
      }
      listItems.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== "ol") {
        flushList();
        listType = "ol";
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)]">
            {article.excerpt}
          </p>
        </div>

        {/* Content */}
        <div className="prose mb-10">{renderContent(article.content)}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1.5 bg-[var(--color-cream)] rounded-lg text-[var(--color-text-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-xl font-semibold mb-4">
            Related Articles
          </h3>
          <div className="grid gap-4">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
              >
                <h4 className="font-semibold">{a.title}</h4>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
