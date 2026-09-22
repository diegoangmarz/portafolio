import { cn } from "@/lib";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "accent"
          ? "border-transparent bg-accent-soft text-accent-strong"
          : "border-border bg-bg-elevated text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
