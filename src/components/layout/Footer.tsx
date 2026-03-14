import Link from "next/link";
import { Cross } from "lucide-react";

const footerLinks = {
  Learn: [
    { href: "/learn", label: "All Lessons" },
    { href: "/learn/who-is-god", label: "Who is God?" },
    { href: "/learn/the-holy-trinity", label: "The Holy Trinity" },
    { href: "/learn/who-is-jesus-christ", label: "Who is Jesus Christ?" },
  ],
  Worship: [
    { href: "/prayers", label: "Prayer Library" },
    { href: "/liturgy", label: "Divine Liturgy" },
    { href: "/saints", label: "Saints" },
  ],
  Explore: [
    { href: "/defend", label: "Defend the Faith" },
    { href: "/blog", label: "Blog" },
    { href: "https://ahadumengesha.substack.com/subscribe", label: "Subscribe (Substack)" },
    { href: "/editors", label: "Editors" },
    { href: "/about", label: "About" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Cross className="w-6 h-6 text-[var(--color-gold)]" />
              <span className="font-serif text-xl font-bold text-white">
                Ethiodox
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Learn the Ethiopian Orthodox Tewahedo faith with clarity, depth,
              and reverence.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-[var(--color-gold)] uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Ethiodox. Glory to God.
            </p>
            <p className="text-sm text-gray-500">
              To the glory of the Father, and of the Son, and of the Holy Spirit.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
