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

export interface Editor {
  id: string;
  name: string;
  slug: string;
  email: string | null;
  bio: string;
  photo_url: string | null;
  links: Record<string, string>;
  active: boolean;
  created_at: string;
}

export interface CmsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  editor_id: string | null;
  tags: string[];
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  editors?: { name: string; slug: string; photo_url: string | null } | null;
}

export interface SitePage {
  id: string;
  page_key: string;
  title: string;
  content: string;
  updated_at: string;
}

type NewLiveBlogPost = Omit<LiveBlogPost, "id" | "created_at">;
type NewSiteUpdate = Omit<SiteUpdate, "id" | "created_at">;
type NewPageViewEvent = Omit<PageViewEvent, "id" | "created_at">;
type NewEditor = Omit<Editor, "id" | "created_at">;
type NewCmsArticle = Omit<CmsArticle, "id" | "created_at" | "updated_at" | "editors">;

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
    cache: init?.cache ?? "no-store",
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

// ============================================================
// Editors
// ============================================================

export async function listActiveEditors() {
  return cmsFetch<Editor[]>(
    "/rest/v1/editors?select=id,name,slug,email,bio,photo_url,links,active,created_at&active=eq.true&order=name.asc"
  );
}

export async function listAllEditors() {
  return cmsFetch<Editor[]>(
    "/rest/v1/editors?select=id,name,slug,email,bio,photo_url,links,active,created_at&order=name.asc"
  );
}

export async function getEditorBySlug(slug: string) {
  const rows = await cmsFetch<Editor[]>(
    `/rest/v1/editors?select=id,name,slug,email,bio,photo_url,links,active,created_at&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function createEditor(editor: NewEditor) {
  const rows = await cmsFetch<Editor[]>("/rest/v1/editors", {
    method: "POST",
    headers: buildHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(editor),
  });
  return rows[0];
}

export async function updateEditor(id: string, data: Partial<NewEditor>) {
  await cmsFetch<null>(`/rest/v1/editors?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: buildHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify(data),
  });
}

export async function deleteEditor(id: string) {
  await cmsFetch<null>(`/rest/v1/editors?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: buildHeaders({ Prefer: "return=minimal" }),
  });
}

// ============================================================
// CMS Articles
// ============================================================

export async function listPublishedArticles() {
  return cmsFetch<CmsArticle[]>(
    "/rest/v1/articles?select=id,title,slug,category,excerpt,content,editor_id,tags,cover_image_url,published,created_at,updated_at,editors(name,slug,photo_url)&published=eq.true&order=created_at.desc"
  );
}

export async function listAllArticles() {
  return cmsFetch<CmsArticle[]>(
    "/rest/v1/articles?select=id,title,slug,category,excerpt,content,editor_id,tags,cover_image_url,published,created_at,updated_at,editors(name,slug,photo_url)&order=created_at.desc"
  );
}

export async function getArticleBySlug(slug: string) {
  const rows = await cmsFetch<CmsArticle[]>(
    `/rest/v1/articles?select=id,title,slug,category,excerpt,content,editor_id,tags,cover_image_url,published,created_at,updated_at,editors(name,slug,photo_url)&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function listArticlesByEditor(editorId: string) {
  return cmsFetch<CmsArticle[]>(
    `/rest/v1/articles?select=id,title,slug,category,excerpt,created_at,tags,cover_image_url,published,editors(name,slug,photo_url)&editor_id=eq.${encodeURIComponent(editorId)}&published=eq.true&order=created_at.desc`
  );
}

export async function createArticle(article: NewCmsArticle) {
  const rows = await cmsFetch<CmsArticle[]>("/rest/v1/articles", {
    method: "POST",
    headers: buildHeaders({ Prefer: "return=representation" }),
    body: JSON.stringify(article),
  });
  return rows[0];
}

export async function updateArticle(id: string, data: Partial<NewCmsArticle>) {
  await cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: buildHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify({ ...data, updated_at: new Date().toISOString() }),
  });
}

export async function deleteArticle(id: string) {
  await cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: buildHeaders({ Prefer: "return=minimal" }),
  });
}

// ============================================================
// Site Pages (editable content like About)
// ============================================================

export async function getSitePage(pageKey: string) {
  const rows = await cmsFetch<SitePage[]>(
    `/rest/v1/site_pages?select=id,page_key,title,content,updated_at&page_key=eq.${encodeURIComponent(pageKey)}&limit=1`
  );
  return rows[0] ?? null;
}

export async function upsertSitePage(pageKey: string, data: { title: string; content: string }) {
  await cmsFetch<null>("/rest/v1/site_pages", {
    method: "POST",
    headers: buildHeaders({
      Prefer: "return=minimal,resolution=merge-duplicates",
    }),
    body: JSON.stringify({
      page_key: pageKey,
      title: data.title,
      content: data.content,
      updated_at: new Date().toISOString(),
    }),
  });
}

// ============================================================
// Image Upload (Supabase Storage)
// ============================================================

export async function uploadImage(bucket: string, fileName: string, file: File) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("CMS is not configured.");
  }

  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: file,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Image upload failed.");
  }

  return getPublicImageUrl(bucket, fileName);
}

export function getPublicImageUrl(bucket: string, fileName: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
}
