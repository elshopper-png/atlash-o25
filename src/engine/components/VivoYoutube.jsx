// ============================================================
// ▶ VivoYoutube — Botón de YouTube para OMEGA-25
// ============================================================

import React from "react";

export default function VivoYoutube({ data, style }) {
  const vivos = data?.vivos || {};
  const cfg = vivos.youtube;

  if (!cfg?.activo) return null;
  if (!cfg.url) return null;

  const icon = "/icons/youtube.png"; // asegurarse que el icono existe en /public/icons/

  return (
    <a
      href={cfg.url}
      target="_blank"
      rel="noopener noreferrer"
      className="o25-vivo o25-latido youtube"
      style={style}
    >
      <img src={icon} alt="YouTube" />
    </a>
  );
}
