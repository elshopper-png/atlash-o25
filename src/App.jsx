// src/App.jsx — ATLASH O25-R

import React from "react";
import AnuncianteEngine from "./engine/AnuncianteEngine";
import PortalSalidaO25 from "./engine/components/PortalSalidaO25.jsx";

function getSlugFromLocation() {
  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return "saul-garrido";
  if (parts[0] === "atlash" && parts[1]) return parts[1];

  return parts[0];
}

export default function App() {
  const params = new URLSearchParams(window.location.search);

  if (params.get("o25portal") === "1") {
    return <PortalSalidaO25 />;
  }

  const slug = getSlugFromLocation();
  return <AnuncianteEngine slug={slug} />;
}