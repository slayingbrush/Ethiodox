import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
    throw new Error("Newsletter is not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: buildHeaders(init?.headers),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Newsletter request failed.");
  }

  if (response.status === 204) return null as T;
  return (await response.json()) as T;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  try {
    await cmsFetch<null>("/rest/v1/newsletter_subscribers", {
      method: "POST",
      headers: buildHeaders({ Prefer: "return=minimal,resolution=merge-duplicates" }),
      body: JSON.stringify({ email, active: true }),
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to subscribe." },
      { status: 500 }
    );
  }
}
