import { cn } from "@/lib";
import { Container } from "./container";

export function Section({
  id,
  title,
  subtitle,
  eyebrow,
  className,
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-strong">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
            )}
            {subtitle && <p className="mt-3 text-base text-fg-muted sm:text-lg">{subtitle}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
