// src/App.jsx — ATLASH O25 (slug por URL)

import React from "react";
import AnuncianteEngine from "./engine/AnuncianteEngine";

export default function App() {
  // Ejemplos válidos:
  // http://localhost:5173/atlash/saul-garrido
  // http://localhost:5173/atlash/mercurio
  const pathname = window.location.pathname; // /atlash/mercurio
  const parts = pathname.split("/").filter(Boolean);
  const slug = parts[1] || "saul-garrido"; // [ 'atlash', 'mercurio' ]

  return <AnuncianteEngine slug={slug} />;
}
