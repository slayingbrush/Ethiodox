import { blogPosts } from "@/data/blog";
import { isCmsConfigured, listPublishedArticles } from "@/lib/cms-client";

const SITE_URL = "https://ethiodox.vercel.app";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let items: { title: string; slug: string; excerpt: string; category: string; author: string; date: string }[] = [];

  if (isCmsConfigured()) {
    try {
      const posts = await listPublishedArticles();
      items = posts
        .sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at))
        .slice(0, 50)
        .map((p) => ({
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt,
          category: p.category,
          author: p.editors?.name ?? "Ethiodox Team",
          date: new Date(p.created_at).toUTCString(),
        }));
    } catch {
      // fall through to fallback
    }
  }

  if (items.length === 0) {
    items = [...blogPosts]
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
      .slice(0, 50)
      .map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        category: p.category,
        author: p.author,
        date: new Date(p.date).toUTCString(),
      }));
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ethiodox Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Educational, historical, and practical posts on living the Ethiopian Orthodox Tewahedo faith.</description>
    <language>en</language>
    <lastBuildDate>${items[0]?.date ?? new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${SITE_URL}/blog/${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${item.slug}</guid>
      <description>${escapeXml(item.excerpt)}</description>
      <category>${escapeXml(item.category)}</category>
      <author>${escapeXml(item.author)}</author>
      <pubDate>${item.date}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
