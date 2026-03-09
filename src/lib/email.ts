import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "";

const SMTP_HOST = process.env.SMTP_HOST ?? "";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER ?? "";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL ?? "";

function isSmtpConfigured() {
  return Boolean(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM_EMAIL);
}

function isResendConfigured() {
  return Boolean(RESEND_API_KEY && RESEND_FROM_EMAIL);
}

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }

  return cachedTransporter;
}

async function sendWithSmtp(payload: EmailPayload) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: SMTP_FROM_EMAIL,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    headers: payload.headers,
  });
}

async function sendWithResend(payload: EmailPayload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      headers: payload.headers,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || "Failed to send email via Resend.");
  }
}

export async function sendEmail(payload: EmailPayload) {
  if (isSmtpConfigured()) {
    await sendWithSmtp(payload);
    return "smtp" as const;
  }

  if (isResendConfigured()) {
    await sendWithResend(payload);
    return "resend" as const;
  }

  throw new Error(
    "Email provider is not configured. Set SMTP_* vars (recommended) or RESEND_* vars."
  );
}

export function getConfiguredFromAddress() {
  if (SMTP_FROM_EMAIL) return SMTP_FROM_EMAIL;
  return RESEND_FROM_EMAIL;
}
