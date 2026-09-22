import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("Blog");

  return (
    <Container className="py-16 sm:py-24">
      <FadeIn className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-fg-muted">{t("subtitle")}</p>
      </FadeIn>
      {/* Sin posts todavía: en la Fase 3 se leen de la base de datos */}
      <FadeIn delay={0.1} className="mt-12 rounded-3xl border border-dashed border-border p-10 text-center">
        <PenLine className="mx-auto size-8 text-accent-strong" aria-hidden />
        <Badge tone="accent" className="mt-4">
          {t("soon")}
        </Badge>
        <p className="mx-auto mt-3 max-w-md text-fg-muted">{t("empty")}</p>
      </FadeIn>
    </Container>
  );
}
