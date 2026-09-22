"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { buttonClass } from "./ui/button-styles";

/** Botón que copia el correo al portapapeles. */
export function CopyEmail() {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Sin permisos de portapapeles: el enlace mailto sigue disponible
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-fg-muted transition-colors hover:border-accent hover:text-fg"
    >
      {copied ? <Check className="size-3.5 text-accent-strong" /> : <Copy className="size-3.5" />}
      {copied ? t("copied") : t("copy")}
    </button>
  );
}

/**
 * Formulario de contacto. Por ahora abre el cliente de correo con el mensaje
 * prellenado (sin backend). En la Fase 3 se cambia por una API route.
 */
export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portafolio · ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm placeholder:text-fg-muted/70 focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("name")}</span>
          <input
            required
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("email")}</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("message")}</span>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={field}
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className={buttonClass("primary")}>
          <Send className="size-4" /> {t("send")}
        </button>
        <p className="text-xs text-fg-muted">{t("soon")}</p>
      </div>
    </form>
  );
}
