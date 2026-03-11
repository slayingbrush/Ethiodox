import { NextRequest, NextResponse } from "next/server";
import { verifySanctuarySession } from "@/lib/sanctuary-auth";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type Session = {
  role: "admin" | "writer";
  editorId: string | null;
};

type BlogPayload = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  editor_id: string | null;
  tags: string[];
  cover_image_url: string | null;
  display_order?: number;
  published: boolean;
};

type ArticleRow = BlogPayload & {
  id: string;
  created_at: string;
  updated_at: string;
  editors?: { name: string; slug: string } | null;
};

type ReorderPayload = {
  mode: "reorder";
  order: string[];
};

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
    throw new Error("CMS is not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: buildHeaders(init?.headers),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "CMS request failed.");
  }

  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

async function getSession(req: NextRequest): Promise<Session | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const session = await verifySanctuarySession(token, ADMIN_PASSCODE);
  if (!session) return null;
  return { role: session.role, editorId: session.editorId };
}

async function getArticleById(id: string) {
  const rows = await cmsFetch<ArticleRow[]>(
    `/rest/v1/articles?select=id,title,slug,category,excerpt,content,editor_id,tags,cover_image_url,display_order,published,created_at,updated_at,editors(name,slug)&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] ?? null;
}

function sanitizeBlogPayload(input: unknown): BlogPayload | null {
  if (!input || typeof input !== "object") return null;
  const raw = input as Record<string, unknown>;

  const tags = Array.isArray(raw.tags)
    ? raw.tags
        .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
        .filter(Boolean)
    : [];

  return {
    id: typeof raw.id === "string" ? raw.id.trim() : undefined,
    title: typeof raw.title === "string" ? raw.title.trim() : "",
    slug: typeof raw.slug === "string" ? raw.slug.trim() : "",
    category: typeof raw.category === "string" ? raw.category.trim() : "",
    excerpt: typeof raw.excerpt === "string" ? raw.excerpt.trim() : "",
    content: typeof raw.content === "string" ? raw.content.trim() : "",
    editor_id: typeof raw.editor_id === "string" ? raw.editor_id.trim() : null,
    tags,
    cover_image_url: typeof raw.cover_image_url === "string" ? raw.cover_image_url.trim() : null,
    published: raw.published === true,
  };
}

function validateBlogPayload(blog: BlogPayload) {
  const errors: string[] = [];
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  if (!blog.title) errors.push("Title is required.");
  if (!blog.category) errors.push("Blog type is required.");
  if (!blog.slug || !slugPattern.test(blog.slug)) {
    errors.push("Slug is invalid. Use lowercase letters, numbers, and hyphens only.");
  }

  // Published posts must meet stricter minimum content quality.
  if (blog.published) {
    if (blog.excerpt.length < 30) {
      errors.push("Excerpt must be at least 30 characters before publishing.");
    }
    if (blog.content.length < 120) {
      errors.push("Content must be at least 120 characters before publishing.");
    }
    if (blog.tags.length === 0) {
      errors.push("Add at least one tag before publishing.");
    }
  }

  return errors;
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const mode = body?.mode === "update" ? "update" : body?.mode === "reorder" ? "reorder" : "create";

  if (mode === "reorder") {
    if (session.role !== "admin") {
      return NextResponse.json({ error: "Only admins can reorder blog posts." }, { status: 403 });
    }

    const reorder = body as ReorderPayload;
    const order = Array.isArray(reorder.order)
      ? reorder.order.map((id) => (typeof id === "string" ? id.trim() : "")).filter(Boolean)
      : [];
    if (order.length === 0) {
      return NextResponse.json({ error: "Blog order is required." }, { status: 400 });
    }
    if (new Set(order).size !== order.length) {
      return NextResponse.json({ error: "Blog order contains duplicate ids." }, { status: 400 });
    }

    try {
      const now = Date.now();
      await Promise.all(
        order.map((id, index) =>
          cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
            method: "PATCH",
            headers: buildHeaders({ Prefer: "return=minimal" }),
            body: JSON.stringify({
              display_order: now - index,
              updated_at: new Date().toISOString(),
            }),
          })
        )
      );

      return NextResponse.json({ ok: true });
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "Failed to reorder blog posts." },
        { status: 500 }
      );
    }
  }

  const blog = sanitizeBlogPayload(body?.blog);
  if (!blog) return NextResponse.json({ error: "Blog payload is required." }, { status: 400 });
  const validationErrors = validateBlogPayload(blog);
  if (validationErrors.length > 0) {
    return NextResponse.json({ error: validationErrors[0] }, { status: 400 });
  }

  if (session.role === "writer") {
    if (!session.editorId || blog.editor_id !== session.editorId) {
      return NextResponse.json({ error: "Editors can only publish from their own editor account." }, { status: 403 });
    }
  }

  try {
    let previous: ArticleRow | null = null;
    if (mode === "update") {
      if (!blog.id) return NextResponse.json({ error: "Blog id is required for update." }, { status: 400 });
      previous = await getArticleById(blog.id);
      if (!previous) return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
      if (session.role === "writer" && previous.editor_id !== session.editorId) {
        return NextResponse.json({ error: "You do not have permission to edit this post." }, { status: 403 });
      }
    }

    let current: ArticleRow | null = null;
    if (mode === "create") {
      const rows = await cmsFetch<ArticleRow[]>("/rest/v1/articles", {
        method: "POST",
        headers: buildHeaders({ Prefer: "return=representation" }),
        body: JSON.stringify({ ...blog, display_order: Date.now() }),
      });
      current = rows[0] ?? null;
    } else {
      await cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(blog.id!)}`, {
        method: "PATCH",
        headers: buildHeaders({ Prefer: "return=minimal" }),
        body: JSON.stringify({
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          excerpt: blog.excerpt,
          content: blog.content,
          editor_id: blog.editor_id,
          tags: blog.tags,
          cover_image_url: blog.cover_image_url,
          published: blog.published,
          updated_at: new Date().toISOString(),
        }),
      });
      current = await getArticleById(blog.id!);
    }

    if (!current) throw new Error("Failed to save blog post.");

    return NextResponse.json({
      ok: true,
      blog: current,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to save blog post.";
    if (typeof message === "string" && message.includes("articles_slug_key")) {
      return NextResponse.json(
        { error: "A blog post with this title/slug already exists. Please use a different title." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  if (!id) return NextResponse.json({ error: "Blog id is required." }, { status: 400 });

  try {
    const existing = await getArticleById(id);
    if (!existing) return NextResponse.json({ error: "Blog post not found." }, { status: 404 });
    if (session.role === "writer" && existing.editor_id !== session.editorId) {
      return NextResponse.json({ error: "You do not have permission to delete this post." }, { status: 403 });
    }

    await cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: buildHeaders({ Prefer: "return=minimal" }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete blog post." },
      { status: 500 }
    );
  }
}
