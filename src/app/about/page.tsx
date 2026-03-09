import { Cross, BookOpen, HandHelping, Shield, Heart, Users } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ethiodox",
  description: "Ethiodox is a modern web platform dedicated to teaching the Ethiopian Orthodox Tewahedo faith in depth.",
};

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Cross className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-4">
            About Ethiodox
          </h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            A modern platform dedicated to teaching the Ethiopian Orthodox
            Tewahedo faith with clarity, depth, and reverence.
          </p>
        </div>

        {/* Mission */}
        <div className="prose mb-12">
          <h2>Our Mission</h2>
          <p>
            Ethiodox exists to help people understand, embrace, and live the
            Ethiopian Orthodox Tewahedo faith. We believe that the ancient wisdom
            of the Church is as relevant today as it was two thousand years ago —
            and that it deserves to be taught with the same depth, beauty, and
            reverence with which it was received.
          </p>
          <p>
            Many Ethiopian and Eritrean Orthodox Christians grew up in the Church
            but were never deeply taught the theology, liturgy, or spiritual
            practices that make Orthodoxy so rich. Ethiodox was created to fill
            that gap — to be the comprehensive, accessible, and reverent learning
            platform that our community needs.
          </p>

          <h2>What We Offer</h2>
          <p>Ethiodox combines education, prayer, and spiritual formation into one platform:</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: BookOpen,
              title: "Structured Learning",
              desc: "Lessons on theology, Christology, sacraments, and spiritual practice — organized for progressive learning.",
            },
            {
              icon: HandHelping,
              title: "Prayer Library",
              desc: "Authentic Orthodox prayers in English, Amharic transliteration, Amharic script, and Ge'ez.",
            },
            {
              icon: Cross,
              title: "Divine Liturgy",
              desc: "The full text of the Kidase with explanations, so you can understand and follow along.",
            },
            {
              icon: Users,
              title: "Saints",
              desc: "Biographies and feast days of the holy men and women honored by the Ethiopian Church.",
            },
            {
              icon: Shield,
              title: "Apologetics",
              desc: "Clear, biblical answers to the most common questions about Orthodox Christianity.",
            },
            {
              icon: Heart,
              title: "Spiritual Formation",
              desc: "Articles and guides on prayer, fasting, confession, and growing in the faith.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-cream)] rounded-xl p-6"
            >
              <item.icon className="w-8 h-8 text-[var(--color-primary)] mb-3" />
              <h3 className="font-serif text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="prose mb-12">
          <h2>Who This Is For</h2>
          <p>
            Ethiodox is designed primarily for young Ethiopian and Eritrean
            Orthodox Christians (ages 16–35) who want to deepen their
            understanding of the faith. But it is also a resource for:
          </p>
          <ul>
            <li>Non-Orthodox Christians curious about Ethiopian Orthodoxy</li>
            <li>Students studying theology</li>
            <li>Diaspora communities seeking accessible teaching</li>
            <li>Church youth groups looking for structured material</li>
            <li>Anyone drawn to the beauty and depth of the Orthodox faith</li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            Everything on Ethiodox is grounded in the authentic teaching of the
            Ethiopian Orthodox Tewahedo Church. We draw from:
          </p>
          <ul>
            <li>Holy Scripture (the Ethiopian biblical canon)</li>
            <li>The Church Fathers</li>
            <li>The ecumenical and local councils</li>
            <li>The liturgical tradition</li>
            <li>The writings of Ethiopian theologians and saints</li>
          </ul>
          <p>
            We present the faith as the Church has received it — without
            dilution, without innovation, and without apology. At the same time,
            we strive to make it accessible to modern readers without sacrificing
            depth or reverence.
          </p>

          <h2>A Living Project</h2>
          <p>
            Ethiodox is a growing platform. We are continually adding new
            lessons, prayers, articles, and resources. Our vision is to become
            the most comprehensive Ethiopian Orthodox learning platform online —
            a digital monastery library, a learning academy, a prayer book, and
            a discipleship platform, all in one.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-primary)] text-white rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">
            Begin Your Journey
          </h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Whether you are rediscovering your faith or exploring Orthodoxy for
            the first time, Ethiodox is here to guide you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/learn"
              className="px-6 py-3 bg-[var(--color-gold)] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/prayers"
              className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Explore Prayers
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)] italic">
            &ldquo;The fear of the LORD is the beginning of wisdom.&rdquo; — Proverbs 9:10
          </p>
        </div>
      </div>
    </div>
  );
}
