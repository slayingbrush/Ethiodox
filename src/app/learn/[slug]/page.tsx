import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { lessons, getLesson } from "@/data/lessons";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return {};
  return {
    title: lesson.title,
    description: lesson.overview,
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
            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </Tag>
      );
      listItems = [];
      listType = null;
    }
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`}>{trimmed.slice(3)}</h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`}>{trimmed.slice(4)}</h3>
      );
    } else if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed.slice(2)) }}
        />
      );
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
          dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
        />
      );
    }
  }
  flushList();
  return elements;
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const currentIndex = lessons.findIndex((l) => l.slug === slug);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = lesson.nextLessonSlug
    ? getLesson(lesson.nextLessonSlug)
    : null;

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/learn"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Lessons
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">
            {lesson.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-2 mb-4">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs px-2.5 py-1 bg-[var(--color-cream)] rounded-full text-[var(--color-text-muted)]">
              {lesson.difficulty}
            </span>
          </div>
        </div>

        {/* Overview */}
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-10">
          <h2 className="font-serif text-lg font-semibold mb-2">Overview</h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {lesson.overview}
          </p>
        </div>

        {/* Content */}
        <div className="prose mb-12">{renderContent(lesson.content)}</div>

        {/* Scripture References */}
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-8">
          <h3 className="font-serif text-lg font-semibold mb-3">
            Scripture References
          </h3>
          <div className="flex flex-wrap gap-2">
            {lesson.scriptureRefs.map((ref) => (
              <span
                key={ref}
                className="text-sm px-3 py-1.5 bg-white rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)]"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>

        {/* Misconceptions */}
        {lesson.misconceptions.length > 0 && (
          <div className="mb-8">
            <h3 className="font-serif text-xl font-semibold mb-4">
              Common Misconceptions
            </h3>
            <div className="space-y-4">
              {lesson.misconceptions.map((m, i) => (
                <div
                  key={i}
                  className="border border-[var(--color-border)] rounded-xl p-6"
                >
                  <p className="font-medium text-[var(--color-primary)] mb-2">
                    &ldquo;{m.claim}&rdquo;
                  </p>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {m.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reflection Questions */}
        {lesson.reflectionQuestions.length > 0 && (
          <div className="bg-[var(--color-primary)]/5 rounded-xl p-6 mb-12">
            <h3 className="font-serif text-xl font-semibold mb-4">
              Reflection Questions
            </h3>
            <ol className="list-decimal list-inside space-y-3">
              {lesson.reflectionQuestions.map((q, i) => (
                <li
                  key={i}
                  className="text-[var(--color-text-muted)] leading-relaxed"
                >
                  {q}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-[var(--color-border)]">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline"
            >
              <ChevronLeft className="w-5 h-5" />
              <div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Previous
                </div>
                <div className="font-medium">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="flex items-center gap-2 text-[var(--color-primary)] hover:underline text-right"
            >
              <div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  Next
                </div>
                <div className="font-medium">{nextLesson.title}</div>
              </div>
              <ChevronRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
