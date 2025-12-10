// src/App.jsx — ATLASH O25 (slug por URL, robusto)

import React from "react";
import AnuncianteEngine from "./engine/AnuncianteEngine";

function getSlugFromLocation() {
  // Ejemplos de posibles paths:
  // "/"                         → slug por defecto
  // "/saul-garrido"             → slug = "saul-garrido"
  // "/atlash/saul-garrido"      → slug = "saul-garrido" (modo antiguo/dev)

  const pathname = window.location.pathname; // p.ej. "/saul-garrido" o "/atlash/saul-garrido"
  const parts = pathname.split("/").filter(Boolean);

  // Sin segmentos → usamos uno por defecto
  if (parts.length === 0) {
    return "saul-garrido";
  }

  // Caso "/atlash/slug"
  if (parts[0] === "atlash" && parts[1]) {
    return parts[1];
  }

  // Caso "/slug"
  return parts[0];
}

export default function App() {
  const slug = getSlugFromLocation();
  return <AnuncianteEngine slug={slug} />;
}
