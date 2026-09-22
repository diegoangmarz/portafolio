import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { profile } from "@/data/profile";
import { t as tr } from "@/lib";
import { Container } from "@/components/ui/container";
import { ContactForm, CopyEmail } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const rowClass = "flex items-center gap-3 rounded-2xl border border-border bg-bg-elevated px-4 py-3";

  return (
    <Container className="py-16 sm:py-24">
      <FadeIn className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-lg text-fg-muted">{t("subtitle")}</p>
      </FadeIn>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <FadeIn delay={0.05} className="space-y-3">
          <div className={rowClass}>
            <Mail className="size-5 shrink-0 text-accent-strong" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-fg-muted">{t("emailLabel")}</p>
              <a href={`mailto:${profile.email}`} className="block truncate font-medium hover:underline">
                {profile.email}
              </a>
            </div>
            <CopyEmail />
          </div>
          <a href={profile.github} target="_blank" rel="noreferrer" className={`${rowClass} hover:border-accent`}>
            <GithubIcon className="size-5 shrink-0 text-accent-strong" />
            <div>
              <p className="text-xs text-fg-muted">{t("githubLabel")}</p>
              <p className="font-medium">@{profile.githubUser}</p>
            </div>
          </a>
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={`${rowClass} hover:border-accent`}>
              <LinkedinIcon className="size-5 shrink-0 text-accent-strong" />
              <div>
                <p className="text-xs text-fg-muted">{t("linkedinLabel")}</p>
                <p className="font-medium">{profile.shortName}</p>
              </div>
            </a>
          )}
          <div className={rowClass}>
            <MapPin className="size-5 shrink-0 text-accent-strong" />
            <div>
              <p className="text-xs text-fg-muted">{t("locationLabel")}</p>
              <p className="font-medium">{tr(profile.location, locale)}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="rounded-3xl border border-border bg-bg-elevated p-6 sm:p-8">
          <ContactForm />
        </FadeIn>
      </div>
    </Container>
  );
}
