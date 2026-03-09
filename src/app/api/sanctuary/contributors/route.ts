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
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type ContributorRow = {
  id: string;
  name: string;
  slug: string;
  editor_id: string;
  can_publish: boolean;
  active: boolean;
  created_at: string;
  editors?: { id: string; name: string; slug: string; email: string | null; photo_url: string | null } | null;
};

type EditorRow = {
  id: string;
  name: string;
  slug: string;
  email: string | null;
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
    `/rest/v1/editors?select=id,name,slug,email,active&id=eq.${encodeURIComponent(editorId)}&limit=1`
  );
  return rows[0] ?? null;
}

async function getContributorByEditor(editorId: string) {
  const rows = await cmsFetch<ContributorRow[]>(
    `/rest/v1/article_contributors?select=id,name,slug,editor_id,can_publish,active,created_at,editors(id,name,slug,email,photo_url)&editor_id=eq.${encodeURIComponent(editorId)}&limit=1`
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

async function sendCredentialsEmail(input: {
  toEmail: string;
  name: string;
  username: string;
  password: string;
}) {
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
    throw new Error("Email provider is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL.");
  }

  const loginUrl = `${SITE_URL.replace(/\/$/, "")}/sanctuary`;
  const subject = "Your Ethiodox Blog Editor Login";
  const text = `Hi ${input.name},

Your editor account has been created.

Login URL: ${loginUrl}
Username: ${input.username}
Password: ${input.password}

For security, please log in and start using it right away.
`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1a1a1a;max-width:640px">
      <h2 style="margin-bottom:12px">Your Ethiodox Blog Editor Access</h2>
      <p>Hi ${input.name},</p>
      <p>Your editor account has been created. Use the login info below:</p>
      <div style="background:#f8f6ef;padding:16px;border-radius:10px;border:1px solid #e8e0ca;margin:16px 0">
        <p style="margin:0 0 8px 0"><strong>Login URL:</strong> <a href="${loginUrl}">${loginUrl}</a></p>
        <p style="margin:0 0 8px 0"><strong>Username:</strong> ${input.username}</p>
        <p style="margin:0"><strong>Password:</strong> ${input.password}</p>
      </div>
      <p style="margin-top:18px">For security, only this account can access your editor workspace.</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [input.toEmail],
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to send credentials email.");
  }
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const rows = await cmsFetch<ContributorRow[]>(
      "/rest/v1/article_contributors?select=id,name,slug,editor_id,can_publish,active,created_at,editors(id,name,slug,email,photo_url)&order=created_at.desc"
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
    if (!editor.email) {
      return NextResponse.json({ error: "Editor must have an email before access can be provisioned." }, { status: 400 });
    }

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

    try {
      await sendCredentialsEmail({
        toEmail: editor.email,
        name: editor.name,
        username,
        password: temporaryPassword,
      });
    } catch (emailError) {
      return NextResponse.json(
        {
          error: emailError instanceof Error ? emailError.message : "Failed to send credentials email.",
          username,
          temporaryPassword,
          note: "Credentials were generated, but delivery failed. Fix email config and reset password to resend.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      username,
      email: editor.email,
      message: rotatePassword ? "Password reset and email sent." : "Editor access created and email sent.",
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
