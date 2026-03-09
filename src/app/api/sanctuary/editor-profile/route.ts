import { NextRequest, NextResponse } from "next/server";
import { verifySanctuarySession } from "@/lib/sanctuary-auth";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type EditorProfile = {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photo_url: string | null;
  links: Record<string, string>;
  active: boolean;
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

async function getEditorForSession(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const session = await verifySanctuarySession(token, ADMIN_PASSCODE);
  if (!session || session.role !== "writer" || !session.editorId) return null;
  return session.editorId;
}

export async function GET(req: NextRequest) {
  const editorId = await getEditorForSession(req);
  if (!editorId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  try {
    const rows = await cmsFetch<EditorProfile[]>(
      `/rest/v1/editors?select=id,name,slug,bio,photo_url,links,active&id=eq.${encodeURIComponent(editorId)}&limit=1`
    );
    const profile = rows[0] ?? null;
    if (!profile) return NextResponse.json({ error: "Editor profile not found." }, { status: 404 });

    return NextResponse.json(profile);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load profile." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const editorId = await getEditorForSession(req);
  if (!editorId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const bio = typeof body?.bio === "string" ? body.bio.trim() : "";
  const photoUrl =
    body?.photo_url === null || typeof body?.photo_url === "string" ? body.photo_url : undefined;
  const linksInput = body?.links;

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const links: Record<string, string> = {};
  if (linksInput && typeof linksInput === "object") {
    for (const [label, url] of Object.entries(linksInput)) {
      const cleanLabel = String(label).trim();
      const cleanUrl = typeof url === "string" ? url.trim() : "";
      if (cleanLabel && cleanUrl) {
        links[cleanLabel] = cleanUrl;
      }
    }
  }

  try {
    await cmsFetch<null>(`/rest/v1/editors?id=eq.${encodeURIComponent(editorId)}`, {
      method: "PATCH",
      headers: buildHeaders({ Prefer: "return=minimal" }),
      body: JSON.stringify({
        name,
        bio,
        photo_url: photoUrl,
        links,
      }),
    });

    // Keep contributor display name aligned with profile name.
    await cmsFetch<null>(`/rest/v1/article_contributors?editor_id=eq.${encodeURIComponent(editorId)}`, {
      method: "PATCH",
      headers: buildHeaders({ Prefer: "return=minimal" }),
      body: JSON.stringify({ name }),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update profile." },
      { status: 500 }
    );
  }
}
