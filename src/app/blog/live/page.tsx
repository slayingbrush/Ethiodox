import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import LiveBlogReader from "@/components/blog/LiveBlogReader";

export const metadata: Metadata = {
  title: "Live Blog Post",
  description: "Read live admin-published blog posts.",
};

export default function LiveBlogPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        <LiveBlogReader />
      </div>
    </div>
  );
}
