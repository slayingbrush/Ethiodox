import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, BookOpen, Church, Lightbulb } from "lucide-react";
import { defendTopics, getDefendTopic } from "@/data/defend";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return defendTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getDefendTopic(slug);
  if (!topic) return {};
  return {
    title: topic.question,
    description: topic.shortAnswer,
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

export default async function DefendTopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getDefendTopic(slug);
  if (!topic) notFound();

  const otherTopics = defendTopics.filter((t) => t.slug !== slug).slice(0, 3);

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/defend"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Defend the Faith
        </Link>

        {/* Header */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
          {topic.question}
        </h1>

        {/* Short Answer */}
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-10">
          <h2 className="font-serif text-lg font-semibold mb-2">
            Short Answer
          </h2>
          <p className="text-[var(--color-text-muted)] leading-relaxed">
            {topic.shortAnswer}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="prose mb-10">
          {renderContent(topic.detailedExplanation)}
        </div>

        {/* Bible References */}
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="font-serif text-lg font-semibold">
              Bible References
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {topic.bibleReferences.map((ref) => (
              <span
                key={ref}
                className="text-sm px-3 py-1.5 bg-white rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)]"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>

        {/* Tradition References */}
        <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Church className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="font-serif text-lg font-semibold">
              Church Tradition References
            </h3>
          </div>
          <ul className="space-y-2">
            {topic.traditionReferences.map((ref) => (
              <li
                key={ref}
                className="text-sm text-[var(--color-text-muted)] flex items-start gap-2"
              >
                <span className="text-[var(--color-gold)] mt-1">&#8226;</span>
                {ref}
              </li>
            ))}
          </ul>
        </div>

        {/* Key Takeaway */}
        <div className="bg-[var(--color-primary)] text-white rounded-xl p-6 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[var(--color-gold)]" />
            <h3 className="font-serif text-lg font-semibold">Key Takeaway</h3>
          </div>
          <p className="leading-relaxed text-white/90">{topic.keyTakeaway}</p>
        </div>

        {/* Other Topics */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-xl font-semibold mb-4">
            More Questions
          </h3>
          <div className="space-y-4">
            {otherTopics.map((t) => (
              <Link
                key={t.slug}
                href={`/defend/${t.slug}`}
                className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
              >
                <h4 className="font-semibold">{t.question}</h4>
                <p className="text-sm text-[var(--color-text-muted)] mt-1 line-clamp-2">
                  {t.shortAnswer}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
