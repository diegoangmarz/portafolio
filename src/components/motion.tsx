"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/** Aparece al entrar en pantalla. Úsalo en secciones y tarjetas. */
export function FadeIn({
  delay = 0,
  y = 16,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease, delay }}
      {...props}
    />
  );
}

/** Contenedor que escalona la aparición de sus hijos `FadeInItem`. */
export function Stagger({
  stagger = 0.08,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    />
  );
}

export function FadeInItem(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
      {...props}
    />
  );
}
