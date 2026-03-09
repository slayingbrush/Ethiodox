export type SanctuaryRole = "admin" | "writer";

export interface SanctuarySession {
  role: SanctuaryRole;
  editorId: string | null;
  editorSlug: string | null;
  name: string | null;
  canPublish: boolean;
  exp: number;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function constantTimeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function toBase64Url(input: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "utf8").toString("base64url");
  }

  const bytes = textEncoder.encode(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(input: string) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "base64url").toString("utf8");
  }

  const padded = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return textDecoder.decode(bytes);
}

async function hmacHex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(message));
  return bytesToHex(new Uint8Array(signature));
}

export function normalizeContributorLogin(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function hashPasscode(passcode: string, secret: string) {
  return hmacHex(secret, passcode.trim());
}

export async function signSanctuarySession(session: SanctuarySession, secret: string) {
  const payload = toBase64Url(JSON.stringify(session));
  const sig = await hmacHex(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifySanctuarySession(token: string, secret: string): Promise<SanctuarySession | null> {
  if (!token || !secret) return null;

  const dotIndex = token.lastIndexOf(".");
  if (dotIndex <= 0) return null;

  const payload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  if (!payload || !sig) return null;

  const expected = await hmacHex(secret, payload);
  if (!constantTimeEqual(sig, expected)) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(payload)) as Partial<SanctuarySession>;
    if (parsed.role !== "admin" && parsed.role !== "writer") return null;
    if (typeof parsed.exp !== "number" || Number.isNaN(parsed.exp)) return null;
    if (Date.now() >= parsed.exp) return null;

    return {
      role: parsed.role,
      editorId: typeof parsed.editorId === "string" ? parsed.editorId : null,
      editorSlug: typeof parsed.editorSlug === "string" ? parsed.editorSlug : null,
      name: typeof parsed.name === "string" ? parsed.name : null,
      canPublish: typeof parsed.canPublish === "boolean" ? parsed.canPublish : true,
      exp: parsed.exp,
    };
  } catch {
    return null;
  }
}
