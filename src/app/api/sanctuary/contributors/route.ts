import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  hashPasscode,
  normalizeContributorLogin,
  verifySanctuarySession,
} from "@/lib/sanctuary-auth";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type ContributorRow = {
  id: string;
  name: string;
  slug: string;
  editor_id: string;
  can_publish: boolean;
  active: boolean;
  created_at: string;
  editors?: { id: string; name: string; slug: string; photo_url: string | null } | null;
};

type EditorRow = {
  id: string;
  name: string;
  slug: string;
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

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const session = await verifySanctuarySession(token, ADMIN_PASSCODE);
  return session?.role === "admin";
}

function generatePassword(length = 14) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*";
  const bytes = randomBytes(length);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}

async function getEditor(editorId: string) {
  const rows = await cmsFetch<EditorRow[]>(
    `/rest/v1/editors?select=id,name,slug,active&id=eq.${encodeURIComponent(editorId)}&limit=1`
  );
  return rows[0] ?? null;
}

async function getContributorByEditor(editorId: string) {
  const rows = await cmsFetch<ContributorRow[]>(
    `/rest/v1/article_contributors?select=id,name,slug,editor_id,can_publish,active,created_at,editors(id,name,slug,photo_url)&editor_id=eq.${encodeURIComponent(editorId)}&limit=1`
  );
  return rows[0] ?? null;
}

async function getContributorBySlug(slug: string) {
  const rows = await cmsFetch<ContributorRow[]>(
    `/rest/v1/article_contributors?select=id,slug&slug=eq.${encodeURIComponent(slug)}&limit=1`
  );
  return rows[0] ?? null;
}

async function generateUniqueUsername(editorSlug: string) {
  const base = normalizeContributorLogin(editorSlug) || `editor-${Date.now()}`;
  const existing = await getContributorBySlug(base);
  if (!existing) return base;

  for (let i = 0; i < 10; i++) {
    const candidate = `${base}-${randomBytes(2).toString("hex")}`;
    const taken = await getContributorBySlug(candidate);
    if (!taken) return candidate;
  }

  return `${base}-${Date.now()}`;
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const rows = await cmsFetch<ContributorRow[]>(
      "/rest/v1/article_contributors?select=id,name,slug,editor_id,can_publish,active,created_at,editors(id,name,slug,photo_url)&order=created_at.desc"
    );
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load editor access accounts." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Admin secret not configured." }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const editorId = typeof body?.editorId === "string" ? body.editorId.trim() : "";
  const rotatePassword = body?.rotatePassword === true;

  if (!editorId) {
    return NextResponse.json({ error: "Editor id is required." }, { status: 400 });
  }

  try {
    const editor = await getEditor(editorId);
    if (!editor) return NextResponse.json({ error: "Editor not found." }, { status: 404 });
    if (!editor.active) return NextResponse.json({ error: "Editor is inactive." }, { status: 400 });

    const existing = await getContributorByEditor(editorId);
    if (existing && !rotatePassword) {
      return NextResponse.json(
        { error: "Access already exists for this editor. Use password reset instead." },
        { status: 409 }
      );
    }

    const username = existing?.slug ?? (await generateUniqueUsername(editor.slug));
    const temporaryPassword = generatePassword();
    const passcodeHash = await hashPasscode(temporaryPassword, ADMIN_PASSCODE);

    if (existing) {
      await cmsFetch<null>(`/rest/v1/article_contributors?id=eq.${encodeURIComponent(existing.id)}`, {
        method: "PATCH",
        headers: buildHeaders({ Prefer: "return=minimal" }),
        body: JSON.stringify({
          name: editor.name,
          passcode_hash: passcodeHash,
          active: true,
          can_publish: true,
        }),
      });
    } else {
      await cmsFetch<ContributorRow[]>("/rest/v1/article_contributors", {
        method: "POST",
        headers: buildHeaders({ Prefer: "return=representation" }),
        body: JSON.stringify({
          name: editor.name,
          slug: username,
          editor_id: editor.id,
          passcode_hash: passcodeHash,
          can_publish: true,
          active: true,
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      username,
      temporaryPassword,
      message: rotatePassword
        ? "Password reset. Share the new credentials with the editor."
        : "Editor access created. Share these credentials with the editor.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to provision editor access." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id.trim() : "";
  if (!id) {
    return NextResponse.json({ error: "Access id is required." }, { status: 400 });
  }

  try {
    await cmsFetch<null>(`/rest/v1/article_contributors?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: buildHeaders({ Prefer: "return=minimal" }),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to revoke editor access." },
      { status: 500 }
    );
  }
}
