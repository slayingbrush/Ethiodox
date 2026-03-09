import Link from "next/link";
import { Shield } from "lucide-react";
import { defendTopics } from "@/data/defend";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Defend the Faith",
  description: "Learn to answer common questions about Ethiopian Orthodox Christianity with confidence, clarity, and charity.",
};

export default function DefendPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-[var(--color-primary)]" />
            <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)]">
              Defend the Faith
            </h1>
          </div>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Orthodox Christianity has deep, intelligent answers to the most
            challenging questions. Learn to defend your faith with confidence,
            clarity, and charity.
          </p>
        </div>

        {/* Topics */}
        <div className="space-y-6">
          {defendTopics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/defend/${topic.slug}`}
              className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl font-serif font-bold text-[var(--color-cream-dark)] shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {topic.question}
                  </h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">
                    {topic.shortAnswer}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
