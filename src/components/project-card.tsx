import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Lock } from "lucide-react";
import { GithubIcon } from "./icons";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Project } from "@/data/projects";
import { t as tr } from "@/lib";
import { Badge } from "./ui/badge";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Projects");

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg hover:shadow-accent/5"
      style={{ ["--card-accent" as string]: project.accent }}
    >
      {/* Franja de color del proyecto */}
      <div
        className="h-1.5 w-full"
        style={{ background: "linear-gradient(90deg, var(--card-accent), transparent 85%)" }}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge>{t(`kind.${project.kind}`)}</Badge>
          {project.featured && <Badge tone="accent">{t("featured")}</Badge>}
          <span className="ml-auto font-mono text-xs text-fg-muted">{project.year}</span>
        </div>

        <h3
          className={
            large ? "text-2xl font-semibold tracking-tight" : "text-lg font-semibold tracking-tight"
          }
        >
          <Link
            href={{ pathname: "/projects/[slug]", params: { slug: project.slug } }}
            className="after:absolute after:inset-0"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted sm:text-[15px]">
          {tr(project.summary, locale)}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t("stack")}>
          {project.stack.slice(0, large ? 8 : 5).map((s) => (
            <li key={s} className="rounded-md bg-bg px-2 py-0.5 font-mono text-[11px] text-fg-muted">
              {s}
            </li>
          ))}
        </ul>

        {/* Los enlaces externos van por encima del overlay del título */}
        <div className="relative z-10 mt-5 flex items-center gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent-strong hover:underline"
            >
              {t("live")} <ArrowUpRight className="size-4" />
            </a>
          )}
          {project.repoUrl && !project.repoPrivate && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-fg-muted hover:text-fg"
            >
              <GithubIcon className="size-4" /> {t("repo")}
            </a>
          )}
          {project.repoPrivate && (
            <span className="inline-flex items-center gap-1 text-fg-muted">
              <Lock className="size-3.5" /> {t("repoPrivate")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
