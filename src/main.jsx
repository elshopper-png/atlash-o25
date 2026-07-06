// ============================================================
// 🔑 main.jsx — Entrada única ATLASH O25
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import AnuncianteEngine from "./engine/AnuncianteEngine.jsx";
import PortalSalidaO25 from "./engine/components/PortalSalidaO25.jsx";

function getSlugFromPathname() {
  const segments = window.location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "saul-garrido";
  return segments[segments.length - 1];
}

function RootO25() {
  const pathname = window.location.pathname;

  if (pathname.startsWith("/portal")) {
    return <PortalSalidaO25 />;
  }

  const slug = getSlugFromPathname();
  return <AnuncianteEngine slug={slug} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootO25 />
  </React.StrictMode>
);