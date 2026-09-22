import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ProjectsGrid } from "@/components/projects-grid";
import { FadeIn } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Projects" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("Projects");

  return (
    <Container className="py-16 sm:py-24">
      <FadeIn className="mb-10 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-fg-muted">{t("subtitle")}</p>
      </FadeIn>
      <ProjectsGrid projects={projects} />
    </Container>
  );
}
