import Link from "next/link";
import { Users } from "lucide-react";
import { saints } from "@/data/saints";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saints",
  description: "Learn about the saints of the Ethiopian Orthodox Tewahedo Church — the Virgin Mary, Archangels, Apostles, and Ethiopian Saints.",
};

export default function SaintsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Saints
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            The saints are our spiritual family — those who have walked the path
            of faith before us and now intercede for us before the throne of God.
            Learn about the holy men and women honored by the Ethiopian Orthodox
            Church.
          </p>
        </div>

        {/* Saints Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saints.map((saint) => (
            <Link
              key={saint.slug}
              href={`/saints/${saint.slug}`}
              className="group block bg-white border border-[var(--color-border)] rounded-xl overflow-hidden hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
            >
              <div className="h-3 bg-[var(--color-primary)]" />
              <div className="p-6">
                <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                  {saint.category}
                </span>
                <h3 className="font-serif text-xl font-semibold mt-2 mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {saint.name}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] italic mb-3">
                  {saint.title}
                </p>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                  {saint.biography.slice(0, 200)}...
                </p>
                <div className="mt-4 text-xs text-[var(--color-text-muted)]">
                  <span className="font-medium">Feast Day:</span>{" "}
                  {saint.feastDay.split(";")[0]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
