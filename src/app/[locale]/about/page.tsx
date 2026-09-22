import type { Metadata } from "next";
import { Briefcase, FileDown, GraduationCap } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { t as tr } from "@/lib";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button-styles";
import { FadeIn } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* Columna principal */}
        <div>
          <FadeIn>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">{t("intro")}</p>
          </FadeIn>

          <FadeIn className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Briefcase className="size-5 text-accent-strong" /> {t("now")}
            </h2>
            <div className="mt-4 rounded-2xl border border-border bg-bg-elevated p-5">
              <p className="font-medium">
                {tr(profile.currentRole.role, locale)} · {profile.currentRole.company}
              </p>
              <p className="font-mono text-xs text-fg-muted">{tr(profile.currentRole.period, locale)}</p>
              <p className="mt-3 text-fg-muted">
                {t("nowBody", { company: profile.currentRole.company })}
              </p>
            </div>
          </FadeIn>

          <FadeIn className="mt-12">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <GraduationCap className="size-5 text-accent-strong" /> {t("education")}
            </h2>
            <ol className="mt-4 space-y-3">
              {profile.education.map((e) => (
                <li key={e.school} className="rounded-2xl border border-border bg-bg-elevated p-5">
                  <p className="font-medium">{tr(e.degree, locale)}</p>
                  <p className="text-sm text-fg-muted">{e.school}</p>
                  <p className="mt-1 font-mono text-xs text-fg-muted">{tr(e.period, locale)}</p>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn className="mt-12">
            <h2 className="text-xl font-semibold">{t("certifications")}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.certifications.map((c) => (
                <li key={c.name}>
                  <Badge className="py-1 text-sm">
                    {c.name} · {c.issuer}
                  </Badge>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Lateral: skills */}
        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <FadeIn delay={0.1}>
            <SkillGroup title={t("skillsStrong")} items={profile.skills.strong} strong />
          </FadeIn>
          <FadeIn delay={0.15}>
            <SkillGroup title={t("skillsFamiliar")} items={profile.skills.familiar} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <SkillGroup
              title={t("skillsAi")}
              items={profile.skills.ai.map((s) => tr(s, locale))}
              accent
            />
          </FadeIn>
          <FadeIn delay={0.25}>
            <button type="button" disabled className={buttonClass("secondary", "w-full")} title={t("cvSoon")}>
              <FileDown className="size-4" /> {t("cvCta")}
            </button>
            <p className="mt-2 text-center text-xs text-fg-muted">{t("cvSoon")}</p>
          </FadeIn>
        </aside>
      </div>
    </Container>
  );
}

function SkillGroup({
  title,
  items,
  strong,
  accent,
}: {
  title: string;
  items: string[];
  strong?: boolean;
  accent?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-fg-muted">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s}>
            <Badge
              tone={accent ? "accent" : "neutral"}
              className={strong ? "py-1 text-sm text-fg" : "py-1 text-sm"}
            >
              {s}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
