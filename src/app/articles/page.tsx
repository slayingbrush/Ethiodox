import { redirect } from "next/navigation";

type SearchParams = Promise<{
  topic?: string;
  author?: string;
}>;

export default async function ArticlesRedirectPage({ searchParams }: { searchParams: SearchParams }) {
  const { topic, author } = await searchParams;
  const params = new URLSearchParams();
  if (topic) params.set("type", topic);
  if (author) params.set("author", author);
  const suffix = params.toString() ? `?${params.toString()}` : "";
  redirect(`/blog${suffix}`);
}
