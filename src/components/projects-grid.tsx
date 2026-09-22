"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { Project, ProjectKind } from "@/data/projects";
import { cn } from "@/lib";
import { ProjectCard } from "./project-card";

const kinds: ProjectKind[] = ["game", "web", "backend", "tool"];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const [kind, setKind] = useState<ProjectKind | "all">("all");
  const visible = kind === "all" ? projects : projects.filter((p) => p.kind === kind);
  const present = kinds.filter((k) => projects.some((p) => p.kind === k));

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t("title")}>
        {(["all", ...present] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={kind === k}
            onClick={() => setKind(k)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              kind === k
                ? "border-transparent bg-accent text-accent-fg"
                : "border-border text-fg-muted hover:border-accent hover:text-fg",
            )}
          >
            {k === "all" ? t("filterAll") : t(`kind.${k}`)}
          </button>
        ))}
      </div>

      <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
