import Link from "next/link";
import type { Metadata } from "next";
import { isCmsConfigured, listActiveEditors, listPublishedArticles } from "@/lib/cms-client";

export const metadata: Metadata = {
  title: "Editors",
  description: "Meet the contributors writing and publishing blog posts on Ethiodox.",
};

export default async function EditorsPage() {
  if (!isCmsConfigured()) {
    return (
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-4">Editors</h1>
          <p className="text-[var(--color-text-muted)]">Editors will appear here once CMS content is configured.</p>
        </div>
      </div>
    );
  }

  const [editors, articles] = await Promise.all([
    listActiveEditors().catch(() => []),
    listPublishedArticles().catch(() => []),
  ]);

  const articleGroups = articles.reduce((acc, article) => {
    if (!article.editor_id) return acc;
    const bucket = acc.get(article.editor_id) ?? [];
    bucket.push(article);
    acc.set(article.editor_id, bucket);
    return acc;
  }, new Map<string, typeof articles>());

  const visibleEditors = editors
    .filter((editor) => (articleGroups.get(editor.id)?.length ?? 0) > 0)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-primary)] mb-4">Editors</h1>
          <p className="text-lg text-[var(--color-text-muted)] leading-relaxed">
            Meet the people writing and publishing blog posts on Ethiodox.
          </p>
        </div>

        {visibleEditors.length === 0 ? (
          <div className="bg-white border border-[var(--color-border)] rounded-xl p-8">
            <p className="text-[var(--color-text-muted)]">No published editor profiles yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleEditors.map((editor) => {
              const editorArticles = articleGroups.get(editor.id) ?? [];
              return (
                <article key={editor.id} className="bg-white border border-[var(--color-border)] rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {editor.photo_url ? (
                      <img src={editor.photo_url} alt={editor.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]">
                        {editor.name[0]}
                      </div>
                    )}
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-[var(--color-primary)]">{editor.name}</h2>
                      <p className="text-xs text-[var(--color-text-muted)]">{editorArticles.length} published blog posts</p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{editor.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Link
                      href={`/blog?author=${editor.slug}`}
                      className="text-sm px-3 py-1.5 rounded-lg bg-[var(--color-primary)] text-white"
                    >
                      View Blog Posts
                    </Link>
                    {Object.entries(editor.links ?? {}).map(([label, url]) => (
                      <a
                        key={`${editor.id}-${label}`}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-cream)]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>

                  <div className="space-y-2">
                    {editorArticles.slice(0, 3).map((article) => (
                      <Link key={article.id} href={`/blog/${article.slug}`} className="block text-sm hover:underline">
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
