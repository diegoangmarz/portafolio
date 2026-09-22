import { NextResponse } from "next/server";
import { contactEmail } from "./email";
import { siteUrl } from "@/lib";

/**
 * Recibe el formulario de contacto y lo envía por correo con Resend
 * (https://resend.com, plan gratis). Sin RESEND_API_KEY —en local— solo lo
 * imprime en la terminal del servidor y responde como si se hubiera enviado.
 *
 * Variables: RESEND_API_KEY, CONTACT_TO_EMAIL (destino), CONTACT_FROM_EMAIL
 * (opcional; por defecto onboarding@resend.dev, que Resend permite sin dominio).
 */

type Payload = { name?: unknown; email?: unknown; message?: unknown; website?: unknown };

const LIMITS = { name: 80, email: 120, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Anti-spam mínimo en memoria: N envíos por IP por ventana (se reinicia con cada instancia).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Campo trampa: los humanos no lo ven; si viene lleno, fingimos éxito y descartamos.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const message = clean(body.message, LIMITS.message);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const { subject, text, html } = contactEmail({
    name,
    email,
    message,
    siteUrl: siteUrl(),
  });

  if (!apiKey || !to) {
    console.log(`[contact] (simulado, sin RESEND_API_KEY) de ${name} <${email}>:\n${message}\n`);
    return NextResponse.json({ ok: true, simulated: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portafolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend respondió", res.status, await res.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
