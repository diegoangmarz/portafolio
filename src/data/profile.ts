import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export const profile = {
  name: "Diego Angulo Marzuca",
  shortName: "Diego Angulo",
  email: "diegoangmarz@gmail.com",
  location: { es: "Mérida, Yucatán, México", en: "Mérida, Yucatán, Mexico" } satisfies Localized,
  github: "https://github.com/diegoangmarz",
  githubUser: "diegoangmarz",
  linkedin: "", // TODO: Diego, pega aquí la URL de tu perfil de LinkedIn
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
    role: {
      es: "Pasante Web Developer · Innovation Dept",
      en: "Web Developer Intern · Innovation Dept",
    } satisfies Localized,
    period: { es: "feb 2025 – presente", en: "Feb 2025 – present" } satisfies Localized,
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
    {
      school: "Desafío Latam",
      place: { es: "En línea", en: "Online" },
      degree: { es: "Data Science / Data Analytics", en: "Data Science / Data Analytics" },
      period: { es: "2025 – nov 2025", en: "2025 – Nov 2025" },
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
