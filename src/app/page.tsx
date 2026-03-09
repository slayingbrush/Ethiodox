import Link from "next/link";
import {
  BookOpen,
  HandHelping,
  Church,
  Shield,
  Users,
  FileText,
  ChevronRight,
  Cross,
  Heart,
  Star,
} from "lucide-react";
import { lessons } from "@/data/lessons";
import { prayers } from "@/data/prayers";
import { articles } from "@/data/articles";

export default function HomePage() {
  const featuredLessons = lessons.slice(0, 3);
  const featuredPrayers = prayers.slice(0, 4);
  const featuredArticles = articles.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[var(--color-primary)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Cross className="w-8 h-8 text-[var(--color-gold)]" />
              <span className="text-[var(--color-gold)] font-serif text-lg">
                Ethiopian Orthodox Tewahedo
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6">
              Welcome to Ethiodox
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl">
              Learn the Ethiopian Orthodox faith with clarity, depth, and
              reverence. Explore structured lessons, authentic prayers, the
              Divine Liturgy, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gold)] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </Link>
              <Link
                href="/prayers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <HandHelping className="w-5 h-5" />
                Explore Prayers
              </Link>
              <Link
                href="/liturgy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Church className="w-5 h-5" />
                Divine Liturgy
              </Link>
              <Link
                href="/defend"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Shield className="w-5 h-5" />
                Defend the Faith
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-6">
              Discover Ethiopian Orthodoxy
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
              The Ethiopian Orthodox Tewahedo Church is one of the oldest
              Christian churches in the world, tracing its roots to the
              Apostolic era. With a rich tradition of theology, liturgy,
              sacred music, and spiritual practice, it offers a profound
              path of faith that has endured for nearly two millennia.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Cross,
                  title: "Ancient Faith",
                  desc: "Christianity in Ethiopia since the 4th century — one of the first nations to adopt the faith",
                },
                {
                  icon: BookOpen,
                  title: "Rich Tradition",
                  desc: "A unique biblical canon, 14 liturgical anaphoras, and the sacred music of St. Yared",
                },
                {
                  icon: Heart,
                  title: "Living Practice",
                  desc: "Over 50 million faithful worldwide, maintaining ancient practices of prayer, fasting, and worship",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl p-6 text-center shadow-sm"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
                Start Learning
              </h2>
              <p className="text-[var(--color-text-muted)] mt-2">
                Structured lessons on Orthodox theology and practice
              </p>
            </div>
            <Link
              href="/learn"
              className="hidden sm:flex items-center gap-1 text-[var(--color-primary)] font-medium hover:underline"
            >
              View all lessons <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/learn/${lesson.slug}`}
                className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
              >
                <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                  {lesson.category}
                </span>
                <h3 className="font-serif text-xl font-semibold mt-2 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                  {lesson.overview}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 bg-[var(--color-cream)] rounded-full text-[var(--color-text-muted)]">
                    {lesson.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1 text-[var(--color-primary)] font-medium"
            >
              View all lessons <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Prayers */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
                Prayer Library
              </h2>
              <p className="text-[var(--color-text-muted)] mt-2">
                Authentic prayers in English, Amharic, and Ge&apos;ez
              </p>
            </div>
            <Link
              href="/prayers"
              className="hidden sm:flex items-center gap-1 text-[var(--color-primary)] font-medium hover:underline"
            >
              View all prayers <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrayers.map((prayer) => (
              <Link
                key={prayer.slug}
                href={`/prayers/${prayer.slug}`}
                className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
              >
                <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                  {prayer.category}
                </span>
                <h3 className="font-serif text-lg font-semibold mt-2 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {prayer.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                  {prayer.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/prayers"
              className="inline-flex items-center gap-1 text-[var(--color-primary)] font-medium"
            >
              View all prayers <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[var(--color-primary)]">
                Articles
              </h2>
              <p className="text-[var(--color-text-muted)] mt-2">
                Guides and reflections on the Orthodox life
              </p>
            </div>
            <Link
              href="/articles"
              className="hidden sm:flex items-center gap-1 text-[var(--color-primary)] font-medium hover:underline"
            >
              View all articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group block bg-white border border-[var(--color-border)] rounded-xl p-6 hover:shadow-lg hover:border-[var(--color-gold)] transition-all"
              >
                <span className="text-xs font-medium text-[var(--color-gold)] uppercase tracking-wider">
                  {article.category}
                </span>
                <h3 className="font-serif text-xl font-semibold mt-2 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Defend the Faith CTA */}
      <section className="py-20 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Shield className="w-12 h-12 text-[var(--color-gold)] mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Defend Your Faith
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Learn to answer the most common questions about Ethiopian Orthodox
            Christianity with confidence, clarity, and charity.
          </p>
          <Link
            href="/defend"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-gold)] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[var(--color-gold-light)] transition-colors"
          >
            <Shield className="w-5 h-5" />
            Explore Apologetics
          </Link>
        </div>
      </section>

      {/* Beginner Section */}
      <section className="py-20 bg-[var(--color-cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Star className="w-10 h-10 text-[var(--color-gold)] mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary)] mb-4">
              New to Orthodoxy?
            </h2>
            <p className="text-lg text-[var(--color-text-muted)] mb-8">
              Whether you grew up in the church or are discovering Ethiopian
              Orthodoxy for the first time, we have resources to help you begin
              your journey.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link
                href="/learn/who-is-god"
                className="block p-4 bg-white rounded-lg border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-md transition-all text-left"
              >
                <h3 className="font-semibold mb-1">Start with the basics</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Begin with &quot;Who is God?&quot;
                </p>
              </Link>
              <Link
                href="/prayers/the-lords-prayer"
                className="block p-4 bg-white rounded-lg border border-[var(--color-border)] hover:border-[var(--color-gold)] hover:shadow-md transition-all text-left"
              >
                <h3 className="font-semibold mb-1">Learn to pray</h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Start with the Lord&apos;s Prayer
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
