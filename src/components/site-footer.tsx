import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { GithubIcon } from "./icons";
import { profile } from "@/data/profile";
import { Container } from "./ui/container";

export function SiteFooter() {
  const t = useTranslations("Footer");
  return (
    <footer className="mt-auto border-t border-border py-10 text-sm text-fg-muted">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.name}. {t("rights")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-fg"
          >
            <GithubIcon className="size-4" /> GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-fg">
            <Mail className="size-4" /> {profile.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
