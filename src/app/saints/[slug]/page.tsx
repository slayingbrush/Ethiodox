import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, BookOpen } from "lucide-react";
import { saints, getSaint } from "@/data/saints";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return saints.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const saint = getSaint(slug);
  if (!saint) return {};
  return {
    title: saint.name,
    description: saint.title,
  };
}

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n- /g, "</p><li>")
    .replace(/<li>/g, '<li class="ml-4 list-disc">')
    ;
}

export default async function SaintPage({ params }: Props) {
  const { slug } = await params;
  const saint = getSaint(slug);
  if (!saint) notFound();

  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <Link
          href="/saints"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Saints
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="text-sm font-medium text-[var(--color-gold)] uppercase tracking-wider">
            {saint.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mt-2 mb-2">
            {saint.name}
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] italic">
            {saint.title}
          </p>
        </div>

        {/* Feast Day */}
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 bg-[var(--color-cream)] rounded-lg p-4">
          <Calendar className="w-5 h-5 text-[var(--color-gold)]" />
          <span>
            <strong>Feast Day:</strong> {saint.feastDay}
          </span>
        </div>

        {/* Biography */}
        <div className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Biography</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: `<p>${renderMarkdown(saint.biography)}</p>`,
            }}
          />
        </div>

        {/* Significance */}
        <div className="mb-10">
          <h2 className="font-serif text-2xl font-bold mb-4">Significance</h2>
          <div
            className="prose"
            dangerouslySetInnerHTML={{
              __html: `<p>${renderMarkdown(saint.significance)}</p>`,
            }}
          />
        </div>

        {/* Associated Prayers */}
        {saint.associatedPrayers.length > 0 && (
          <div className="bg-[var(--color-cream)] rounded-xl p-6 mb-8">
            <h3 className="font-serif text-lg font-semibold mb-3">
              Associated Prayers
            </h3>
            <ul className="space-y-2">
              {saint.associatedPrayers.map((prayer) => (
                <li key={prayer}>
                  <span className="text-[var(--color-text-muted)]">
                    {prayer}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Other Saints */}
        <div className="pt-8 border-t border-[var(--color-border)]">
          <h3 className="font-serif text-xl font-semibold mb-4">
            Other Saints
          </h3>
          <div className="grid gap-4">
            {saints
              .filter((s) => s.slug !== slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/saints/${s.slug}`}
                  className="block p-4 bg-white border border-[var(--color-border)] rounded-lg hover:border-[var(--color-gold)] hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold">{s.name}</h4>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {s.title}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
