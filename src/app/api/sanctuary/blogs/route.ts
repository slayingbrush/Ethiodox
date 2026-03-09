import { NextRequest, NextResponse } from "next/server";
import { verifySanctuarySession } from "@/lib/sanctuary-auth";
import { getConfiguredFromAddress, sendEmail } from "@/lib/email";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
  published: boolean;
};

type ArticleRow = BlogPayload & {
  id: string;
  created_at: string;
  updated_at: string;
  editors?: { name: string; slug: string } | null;
};

type NewsletterSubscriber = {
  email: string;
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
    `/rest/v1/articles?select=id,title,slug,category,excerpt,content,editor_id,tags,cover_image_url,published,created_at,updated_at,editors(name,slug)&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] ?? null;
}

async function listActiveSubscribers() {
  return cmsFetch<NewsletterSubscriber[]>(
    "/rest/v1/newsletter_subscribers?select=email&active=eq.true"
  );
}

async function sendNewsletterEmail(post: ArticleRow) {
  const subscribers = await listActiveSubscribers();
  if (subscribers.length === 0) return 0;
  const fromAddressRaw = getConfiguredFromAddress();
  const fromAddressMatch = fromAddressRaw.match(/<([^>]+)>/);
  const fromAddress = fromAddressMatch?.[1] ?? fromAddressRaw;

  const postUrl = `${SITE_URL.replace(/\/$/, "")}/blog/${post.slug}`;
  const subject = `${post.title} | Ethiodox Blog`;
  const plainText = `${post.title}

${post.excerpt}

Read: ${postUrl}
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1a1a1a;max-width:680px">
      <h1 style="margin:0 0 12px 0;font-size:28px">${post.title}</h1>
      <p style="margin:0 0 8px 0;color:#7a6f58;text-transform:uppercase;font-size:12px;letter-spacing:1px">${post.category}</p>
      <p style="font-size:16px;margin:0 0 18px 0">${post.excerpt}</p>
      <a href="${postUrl}" style="display:inline-block;background:#183A5A;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:600">Read Full Blog Post</a>
      <hr style="margin:26px 0;border:none;border-top:1px solid #e5e5e5" />
      <p style="font-size:12px;color:#666">You received this because you subscribed to Ethiodox blog updates.</p>
    </div>
  `;

  let sent = 0;
  for (const subscriber of subscribers) {
    await sendEmail({
      to: subscriber.email,
      subject,
      html,
      text: plainText,
      headers: {
        "List-Unsubscribe": `<mailto:${fromAddress}?subject=unsubscribe>`,
      },
    });

    sent += 1;
  }

  return sent;
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const mode = body?.mode === "update" ? "update" : "create";
  const blog = body?.blog as BlogPayload | undefined;
  if (!blog) return NextResponse.json({ error: "Blog payload is required." }, { status: 400 });

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
        body: JSON.stringify(blog),
      });
      current = rows[0] ?? null;
    } else {
      await cmsFetch<null>(`/rest/v1/articles?id=eq.${encodeURIComponent(blog.id!)}`, {
        method: "PATCH",
        headers: buildHeaders({ Prefer: "return=minimal" }),
        body: JSON.stringify({ ...blog, updated_at: new Date().toISOString() }),
      });
      current = await getArticleById(blog.id!);
    }

    if (!current) throw new Error("Failed to save blog post.");

    const shouldSendNewsletter =
      current.published && (mode === "create" || (previous && previous.published === false));

    let newsletterSent = 0;
    let newsletterWarning: string | null = null;
    if (shouldSendNewsletter) {
      try {
        newsletterSent = await sendNewsletterEmail(current);
      } catch (newsletterError) {
        newsletterWarning =
          newsletterError instanceof Error
            ? newsletterError.message
            : "Blog saved, but newsletter delivery failed.";
      }
    }

    return NextResponse.json({
      ok: true,
      blog: current,
      newsletterSent,
      newsletterTriggered: shouldSendNewsletter,
      newsletterWarning,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save blog post." },
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
