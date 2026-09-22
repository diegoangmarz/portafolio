import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

// Sin correo ni ubicación a propósito: Diego no quiere mostrarlos (2026-09-21).
// El destino del formulario de contacto va en la variable de entorno CONTACT_TO_EMAIL.
export const profile = {
  name: "Diego Angulo Marzuca",
  shortName: "Diego Angulo",
  github: "https://github.com/diegoangmarz",
  githubUser: "diegoangmarz",
  linkedin: "https://www.linkedin.com/in/diegoangmarz/",
  title: {
    es: "Ingeniero en Desarrollo de Tecnología y Software",
    en: "Software & Technology Development Engineer",
  } satisfies Localized,
  tagline: {
    es: "Desarrollador full-stack con foco en inteligencia artificial y automatización.",
    en: "Full-stack developer focused on artificial intelligence and automation.",
  } satisfies Localized,
  currentRole: {
    company: "SimDataGroup",
    // Empezó como pasante (feb 2025) y hoy es empleado de tiempo completo. Solo puesto y tipo
    // de trabajo, sin detalles del producto (confidencial; no se menciona en el sitio).
    role: {
      es: "Desarrollador Full-stack",
      en: "Full-stack Developer",
    } satisfies Localized,
    period: { es: "2025 – presente", en: "2025 – present" } satisfies Localized,
  },
  education: [
    {
      school: "Universidad Modelo",
      place: { es: "Mérida, Yucatán", en: "Mérida, Yucatán" },
      degree: {
        es: "Ingeniería en Desarrollo de Tecnología y Software",
        en: "B.Eng. in Software & Technology Development",
      },
      period: { es: "ago 2021 – jun 2025", en: "Aug 2021 – Jun 2025" },
    },
  ],
  certifications: [
    { name: "C# Total", issuer: "Udemy" },
    { name: "Python", issuer: "Udemy" },
  ],
  skills: {
    strong: [
      "TypeScript",
      "React",
      "Angular",
      "Node.js",
      "Nest.js",
      "Next.js",
      "Python",
      "Prisma",
      "REST APIs",
      "SQL",
      "PostgreSQL",
      "MongoDB",
    ],
    familiar: [
      "C#",
      "Kotlin",
      "Swift",
      "Vite",
      "Unity",
      "Flutter / Dart",
      "Socket.IO",
      "Tailwind CSS",
    ],
    ai: [
      { es: "API de Claude (Anthropic)", en: "Claude API (Anthropic)" },
      { es: "Generación de contenido con LLMs", en: "LLM content generation" },
      { es: "Automatización con Python", en: "Python automation" },
      { es: "Análisis de datos", en: "Data analysis" },
    ] satisfies Localized[],
  },
};
