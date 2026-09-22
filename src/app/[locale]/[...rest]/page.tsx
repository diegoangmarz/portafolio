import { notFound } from "next/navigation";

// Cualquier ruta desconocida dentro de un locale cae en el not-found del locale.
export default function CatchAll() {
  notFound();
}
