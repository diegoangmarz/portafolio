import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/container";
import { buttonClass } from "@/components/ui/button-styles";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <Container className="flex flex-col items-start gap-4 py-24">
      <p className="font-mono text-sm text-accent-strong">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-fg-muted">{t("body")}</p>
      <Link href="/" className={buttonClass("secondary")}>
        {t("home")}
      </Link>
    </Container>
  );
}
