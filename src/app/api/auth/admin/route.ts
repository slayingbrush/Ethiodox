import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  hashPasscode,
  normalizeContributorLogin,
  signSanctuarySession,
  verifySanctuarySession,
  type SanctuarySession,
} from "@/lib/sanctuary-auth";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE ?? "";
const COOKIE_NAME = "ethiodox_admin_session";
const MAX_AGE = 60 * 60 * 24; // 24 hours
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

type ContributorWithEditor = {
  id: string;
  name: string;
  slug: string;
  editor_id: string | null;
  can_publish: boolean;
  passcode_hash: string;
  active: boolean;
  editors?: { id: string; slug: string; name: string; active: boolean } | null;
};

function isSupabaseConfigured() {
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

function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: MAX_AGE,
  });
}

function stringsMatch(a: string, b: string) {
  try {
    const left = Buffer.from(a);
    const right = Buffer.from(b);
    if (left.length !== right.length) return false;
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

async function createAndSetSession(res: NextResponse, session: SanctuarySession) {
  const token = await signSanctuarySession(session, ADMIN_PASSCODE);
  setSessionCookie(res, token);
}

async function findActiveContributor(login: string) {
  const rows = await cmsFetch<ContributorWithEditor[]>(
    `/rest/v1/article_contributors?select=id,name,slug,editor_id,can_publish,passcode_hash,active,editors(id,name,slug,active)&slug=eq.${encodeURIComponent(login)}&active=eq.true&limit=1`
  );
  return rows[0] ?? null;
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const session = await verifySanctuarySession(token, ADMIN_PASSCODE);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    role: session.role,
    name: session.name,
    editorId: session.editorId,
    editorSlug: session.editorSlug,
    canPublish: session.canPublish,
    expiresAt: session.exp,
  });
}

export async function POST(req: NextRequest) {
  if (!ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Admin not configured." }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const passcode = typeof body?.passcode === "string" ? body.passcode.trim() : "";
  const identifierRaw = typeof body?.identifier === "string" ? body.identifier : "";
  const identifier = normalizeContributorLogin(identifierRaw);

  if (!passcode) {
    return NextResponse.json({ error: "Passcode is required." }, { status: 400 });
  }

  if (stringsMatch(passcode, ADMIN_PASSCODE)) {
    const res = NextResponse.json({ ok: true, role: "admin" as const });
    await createAndSetSession(res, {
      role: "admin",
      name: "Administrator",
      editorId: null,
      editorSlug: null,
      canPublish: true,
      exp: Date.now() + MAX_AGE * 1000,
    });
    return res;
  }

  if (!identifier) {
    return NextResponse.json(
      { error: "For editor access, enter your username and passcode." },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Editor access is unavailable until CMS is configured." },
      { status: 500 }
    );
  }

  try {
    const contributor = await findActiveContributor(identifier);
    if (!contributor?.passcode_hash || !contributor.editor_id || contributor.editors?.active === false) {
      return NextResponse.json({ error: "Incorrect credentials." }, { status: 401 });
    }

    const incomingHash = await hashPasscode(passcode, ADMIN_PASSCODE);
    if (!stringsMatch(incomingHash, contributor.passcode_hash)) {
      return NextResponse.json({ error: "Incorrect credentials." }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, role: "writer" as const });
    await createAndSetSession(res, {
      role: "writer",
      name: contributor.name,
      editorId: contributor.editor_id,
      editorSlug: contributor.editors?.slug ?? null,
      canPublish: contributor.can_publish,
      exp: Date.now() + MAX_AGE * 1000,
    });
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unable to verify credentials." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  try {
    res.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
  } catch {
    // no-op
  }
  return res;
}
