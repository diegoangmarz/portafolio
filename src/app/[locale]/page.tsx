import { ArrowRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { t as tr } from "@/lib";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button-styles";
import { ProjectCard } from "@/components/project-card";
import { FadeIn, FadeInItem, Stagger } from "@/components/motion";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      {/* Hero */}
      <section className="hero-glow relative overflow-hidden">
        <Container className="flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 sm:py-28">
          <FadeIn>
            <p className="font-mono text-sm text-fg-muted sm:text-base">{t("greeting")}</p>
            <h1 className="mt-2 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {profile.shortName}
              <span className="text-accent">.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="mt-5 max-w-xl text-lg text-fg-muted sm:text-xl">
              {tr(profile.title, locale)} — {tr(profile.tagline, locale)}
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className={buttonClass("primary")}>
              {t("cta")} <ArrowRight className="size-4" />
            </Link>
            <Link href="/contact" className={buttonClass("secondary")}>
              {t("ctaSecondary")}
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={buttonClass("ghost")}
              aria-label="GitHub"
            >
              <GithubIcon className="size-5" />
            </a>
          </FadeIn>
        </Container>
      </section>

      {/* Proyectos destacados */}
      <Section
        eyebrow="01"
        title={t("featuredTitle")}
        subtitle={t("featuredSubtitle")}
        className="border-t border-border"
      >
        <Stagger className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((p) => (
            <FadeInItem key={p.slug}>
              <ProjectCard project={p} />
            </FadeInItem>
          ))}
        </Stagger>
        <FadeIn className="mt-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-strong hover:underline"
          >
            {t("allProjects")} <ArrowRight className="size-4" />
          </Link>
        </FadeIn>
      </Section>

      {/* Stack */}
      <Section eyebrow="02" title={t("stackTitle")} subtitle={t("stackSubtitle")} className="bg-bg-elevated/40">
        <Stagger className="flex flex-wrap gap-2" stagger={0.03}>
          {profile.skills.strong.map((s) => (
            <FadeInItem key={s}>
              <span className="inline-flex rounded-xl border border-border bg-bg-elevated px-3.5 py-2 text-sm font-medium">
                {s}
              </span>
            </FadeInItem>
          ))}
          {profile.skills.familiar.map((s) => (
            <FadeInItem key={s}>
              <span className="inline-flex rounded-xl border border-dashed border-border px-3.5 py-2 text-sm text-fg-muted">
                {s}
              </span>
            </FadeInItem>
          ))}
        </Stagger>
      </Section>

      {/* IA */}
      <Section eyebrow="03" className="border-t border-border">
        <FadeIn className="relative overflow-hidden rounded-3xl border border-border bg-bg-elevated p-8 sm:p-12">
          <Sparkles className="absolute -right-6 -top-6 size-40 text-accent/10" aria-hidden />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("aiTitle")}</h2>
          <p className="mt-4 max-w-2xl text-fg-muted sm:text-lg">{t("aiBody")}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.skills.ai.map((s) => (
              <li key={s.es}>
                <Badge tone="accent" className="py-1 text-sm">
                  {tr(s, locale)}
                </Badge>
              </li>
            ))}
          </ul>
        </FadeIn>
      </Section>
    </>
  );
}
