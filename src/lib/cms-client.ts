export interface LiveBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  created_at: string;
  published: boolean;
}

export interface SiteUpdate {
  id: string;
  title: string;
  section: string;
  content: string;
  created_at: string;
  published: boolean;
}

export interface PageViewEvent {
  id: string;
  path: string;
  session_id: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

type NewLiveBlogPost = Omit<LiveBlogPost, "id" | "created_at">;
type NewSiteUpdate = Omit<SiteUpdate, "id" | "created_at">;
type NewPageViewEvent = Omit<PageViewEvent, "id" | "created_at">;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isCmsConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

function buildHeaders(extra?: HeadersInit): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY ?? "",
    Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ""}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function cmsFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("CMS is not configured. Missing Supabase environment variables.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init?.headers),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "CMS request failed.");
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function listPublishedBlogPosts() {
  return cmsFetch<LiveBlogPost[]>(
    "/rest/v1/blog_posts?select=id,title,slug,category,excerpt,content,author,tags,created_at,published&published=eq.true&order=created_at.desc"
  );
}

export async function listAllBlogPosts() {
  return cmsFetch<LiveBlogPost[]>(
    "/rest/v1/blog_posts?select=id,title,slug,category,excerpt,content,author,tags,created_at,published&order=created_at.desc"
  );
}

export async function createBlogPost(post: NewLiveBlogPost) {
  const rows = await cmsFetch<LiveBlogPost[]>("/rest/v1/blog_posts", {
    method: "POST",
    headers: buildHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(post),
  });
  return rows[0];
}

export async function deleteBlogPost(id: string) {
  await cmsFetch<null>(`/rest/v1/blog_posts?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: buildHeaders({ Prefer: "return=minimal" }),
  });
}

export async function listPublishedSiteUpdates() {
  return cmsFetch<SiteUpdate[]>(
    "/rest/v1/site_updates?select=id,title,section,content,created_at,published&published=eq.true&order=created_at.desc"
  );
}

export async function listAllSiteUpdates() {
  return cmsFetch<SiteUpdate[]>(
    "/rest/v1/site_updates?select=id,title,section,content,created_at,published&order=created_at.desc"
  );
}

export async function createSiteUpdate(update: NewSiteUpdate) {
  const rows = await cmsFetch<SiteUpdate[]>("/rest/v1/site_updates", {
    method: "POST",
    headers: buildHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(update),
  });
  return rows[0];
}

export async function deleteSiteUpdate(id: string) {
  await cmsFetch<null>(`/rest/v1/site_updates?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: buildHeaders({ Prefer: "return=minimal" }),
  });
}

export async function insertPageView(event: NewPageViewEvent) {
  await cmsFetch<null>("/rest/v1/page_events", {
    method: "POST",
    headers: buildHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(event),
  });
}

export async function listPageViews(days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return cmsFetch<PageViewEvent[]>(
    `/rest/v1/page_events?select=id,path,session_id,referrer,user_agent,created_at&created_at=gte.${encodeURIComponent(
      since
    )}&order=created_at.desc&limit=5000`
  );
}
