import { cn } from "@/lib";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
    "disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-accent text-accent-fg hover:bg-accent-strong",
    variant === "secondary" &&
      "border border-border bg-bg-elevated text-fg hover:border-accent hover:text-accent-strong",
    variant === "ghost" && "text-fg-muted hover:text-fg",
    className,
  );
}
