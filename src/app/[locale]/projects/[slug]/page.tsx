import type { Metadata } from "next";
import { GithubIcon } from "@/components/icons";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, projects } from "@/data/projects";
import { t as tr } from "@/lib";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button-styles";
import { ProjectCard } from "@/components/project-card";
import { FadeIn } from "@/components/motion";

type Props = PageProps<"/[locale]/projects/[slug]">;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: tr(project.summary, locale) };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations("Projects");
  const others = projects.filter((p) => p.slug !== project.slug && p.featured).slice(0, 3);

  return (
    <Container className="py-12 sm:py-20">
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg"
        >
          <ArrowLeft className="size-4" /> {t("back")}
        </Link>
      </FadeIn>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <article>
          <FadeIn delay={0.05}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{t(`kind.${project.kind}`)}</Badge>
              {project.featured && <Badge tone="accent">{t("featured")}</Badge>}
              <span className="font-mono text-xs text-fg-muted">{project.year}</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 text-lg text-fg-muted">{tr(project.summary, locale)}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className={buttonClass("primary")}>
                  {t("live")} <ArrowUpRight className="size-4" />
                </a>
              )}
              {project.repoUrl && !project.repoPrivate && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className={buttonClass("secondary")}>
                  <GithubIcon className="size-4" /> {t("repo")}
                </a>
              )}
              {project.repoPrivate && (
                <span className={buttonClass("ghost", "cursor-default")}>
                  <Lock className="size-4" /> {t("repoPrivate")}
                </span>
              )}
            </div>
          </FadeIn>

          {/* Franja de color del proyecto (placeholder hasta tener capturas) */}
          <FadeIn delay={0.1} className="mt-10 overflow-hidden rounded-3xl border border-border">
            <div
              className="flex aspect-[16/8] items-end p-6 sm:p-8"
              style={{
                background: `linear-gradient(135deg, ${project.accent} 0%, transparent 70%), var(--bg-elevated)`,
              }}
            >
              <span className="font-mono text-xs uppercase tracking-widest text-fg/70">{project.slug}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="prose-custom mt-10 space-y-5 text-[17px] leading-relaxed text-fg/90">
            {tr(project.description, locale)
              .split("\n\n")
              .map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          </FadeIn>

          {project.aiNote && (
            <FadeIn delay={0.2} className="mt-10 rounded-2xl border border-accent/30 bg-accent-soft p-6">
              <h2 className="flex items-center gap-2 font-semibold text-accent-strong">
                <Sparkles className="size-4" /> {t("aiNote")}
              </h2>
              <p className="mt-2 text-fg/90">{tr(project.aiNote, locale)}</p>
            </FadeIn>
          )}
        </article>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          {project.highlights.length > 0 && (
            <FadeIn delay={0.1}>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-muted">
                {t("highlights")}
              </h2>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h.es} className="flex gap-3 text-sm">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {tr(h, locale)}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}
          <FadeIn delay={0.15}>
            <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-muted">{t("stack")}</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge className="py-1 text-sm text-fg">{s}</Badge>
                </li>
              ))}
            </ul>
          </FadeIn>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-24 border-t border-border pt-12">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{t("moreProjects")}</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
