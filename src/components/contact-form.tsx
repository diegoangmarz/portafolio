"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { buttonClass } from "./ui/button-styles";

type Status = "idle" | "sending" | "success" | "error";

/** Formulario de contacto: envía a /api/contact (Resend). */
export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="size-10 text-accent-strong" aria-hidden />
        <p className="font-medium">{t("success")}</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm placeholder:text-fg-muted/70 focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("name")}</span>
          <input required name="name" autoComplete="name" maxLength={80} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">{t("email")}</span>
          <input required type="email" name="email" autoComplete="email" maxLength={120} className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium">{t("message")}</span>
        <textarea required name="message" rows={5} minLength={10} maxLength={4000} className={field} />
      </label>
      {/* Campo trampa anti-spam: oculto para personas, los bots lo rellenan */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className={buttonClass("primary")}>
          <Send className="size-4" /> {status === "sending" ? t("sending") : t("send")}
        </button>
        <p className="text-xs text-fg-muted" role={status === "error" ? "alert" : undefined}>
          {status === "error" ? t("error") : t("note")}
        </p>
      </div>
    </form>
  );
}
