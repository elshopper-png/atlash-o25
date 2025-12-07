// ============================================================
// 🔑 main.jsx — Entrada única ATLASH O25
// Lee el slug desde la URL y lo entrega al Engine
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import AnuncianteEngine from "./engine/AnuncianteEngine.jsx";

// 🧭 Extraer slug desde la URL: /saul-garrido, /elevarq, etc.
function getSlugFromPathname() {
  const segments = window.location.pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "saul-garrido";

  return segments[segments.length - 1];
}

const slug = getSlugFromPathname();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnuncianteEngine slug={slug} />
  </React.StrictMode>
);
