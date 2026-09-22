import type { Localized } from "./profile";

export type ProjectKind = "web" | "game" | "backend" | "tool";

export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  kind: ProjectKind;
  year: number;
  summary: Localized;
  /** Párrafos separados por "\n\n". */
  description: Localized;
  highlights: Localized[];
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  repoPrivate?: boolean;
  aiNote?: Localized;
  /** Color de acento de la tarjeta (cualquier valor CSS). */
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "triviaspin",
    name: "TriviaSpin",
    featured: true,
    kind: "game",
    year: 2025,
    accent: "oklch(0.65 0.2 290)",
    summary: {
      es: "Trivia para fiestas en un solo teléfono: ruleta de categorías, comodines, Modo Sala multi-dispositivo y preguntas generadas con IA.",
      en: "Party trivia on a single phone: category wheel, power-ups, multi-device Room Mode and AI-generated questions.",
    },
    description: {
      es: "Juego de trivia «pasa y juega» pensado para reuniones: se registran los jugadores, una ruleta elige la categoría y quien responde acierta o falla entre cuatro opciones. Incluye duelos, contrarreloj, Modo Fiesta con retos, personajes por categoría, podio con reconocimientos y estadísticas acumuladas por jugador.\n\nEs una PWA instalable que funciona offline con un banco local de más de 370 preguntas; cuando la API está disponible, el banco se sirve desde PostgreSQL y se pueden generar preguntas nuevas por tema con la API de Claude. El Modo Sala convierte un dispositivo en anfitrión (ruleta + marcador) y cada jugador responde desde su celular vía Socket.IO, con reconexión y toma de control si un teléfono se cae.",
      en: "A pass-and-play trivia game built for gatherings: players sign up, a wheel picks the category and whoever is up answers one of four options. It ships with duels, timed rounds, a Party Mode with dares, per-category characters, a podium with awards and cumulative per-player stats.\n\nIt is an installable PWA that works offline with a local bank of 370+ questions; when the API is up, questions are served from PostgreSQL and new ones can be generated per topic with the Claude API. Room Mode turns one device into the host (wheel + scoreboard) while every player answers from their own phone over Socket.IO, with reconnection and takeover if a phone drops.",
    },
    highlights: [
      { es: "Front React 19 + Vite como PWA offline-first", en: "React 19 + Vite front as an offline-first PWA" },
      { es: "API Nest.js + Prisma sobre PostgreSQL (Neon)", en: "Nest.js + Prisma API on PostgreSQL (Neon)" },
      { es: "Modo Sala en tiempo real con Socket.IO", en: "Real-time Room Mode with Socket.IO" },
      { es: "Generación de preguntas con la API de Claude", en: "Question generation with the Claude API" },
      { es: "Probado en playtest real con jugadores", en: "Playtested with real players" },
    ],
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Nest.js",
      "Prisma",
      "PostgreSQL",
      "Socket.IO",
      "Claude API",
    ],
    liveUrl: "https://trivia-spin.vercel.app",
    repoUrl: "https://github.com/diegoangmarz/TriviaSpin",
    aiNote: {
      es: "El backend expone un endpoint que, dado un tema y una dificultad, pide a Claude un lote de preguntas en JSON estricto, lo valida y lo guarda en la base de datos para reutilizarlo.",
      en: "The backend exposes an endpoint that, given a topic and difficulty, asks Claude for a batch of questions in strict JSON, validates it and stores it in the database for reuse.",
    },
  },
  {
    slug: "el-alce-manda",
    name: "El Alce Manda",
    featured: true,
    kind: "game",
    year: 2025,
    accent: "oklch(0.72 0.17 55)",
    summary: {
      es: "Juego de cartas para fiestas inspirado en Moose Master, con contenido original en español y Modo Sala con relé en tiempo real.",
      en: "Party card game inspired by Moose Master, with original Spanish content and a real-time Room Mode relay.",
    },
    description: {
      es: "Reglas absurdas siempre activas, cartas que obligan a reaccionar al instante, retos en cadena, cartas secretas, los Cuernos, la Bomba… y penalizaciones para quien se equivoca. Gana quien menos tenga. Toda la lógica del juego vive en el cliente como un reducer tipado y probado con Vitest.\n\nSe juega en un solo teléfono o en Modo Sala: un dispositivo en la mesa y cada jugador en el suyo. El relé de salas es un servicio Nest.js + Socket.IO en memoria, sin base de datos, con tests de ida y vuelta usando socket.io-client real.",
      en: "Always-on absurd rules, cards that demand an instant reaction, chained dares, secret cards, the Horns, the Bomb… and penalties for whoever slips. Lowest score wins. All game logic lives in the client as a typed reducer covered by Vitest.\n\nPlay on a single phone or in Room Mode: one device on the table and each player on their own. The room relay is an in-memory Nest.js + Socket.IO service, no database, with round-trip tests using a real socket.io-client.",
    },
    highlights: [
      { es: "Diseño de juego y mazo originales documentados en DESIGN.md", en: "Original game design and deck documented in DESIGN.md" },
      { es: "Reducer puro con tests de Vitest", en: "Pure reducer with Vitest tests" },
      { es: "Relé Socket.IO desplegado en Render", en: "Socket.IO relay deployed on Render" },
      { es: "Playtest con jugadores reales", en: "Playtested with real players" },
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Nest.js", "Socket.IO", "Vitest"],
    liveUrl: "https://el-alce-manda.vercel.app",
    repoUrl: "https://github.com/diegoangmarz/ElAlceManda",
    repoPrivate: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
