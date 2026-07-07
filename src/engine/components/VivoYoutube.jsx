// ============================================================
// ▶ VivoYoutube — Botón de YouTube para OMEGA-25
// ============================================================

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

export default function VivoYoutube({
  data,
  style,
  onRequestExternal,
}) {
  const cfg = data?.vivos?.youtube;

  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();

    onRequestExternal?.({
      icon: "/icons/youtube.png",
      open: () => openExternalO25(cfg.url, "youtube"),
    });
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido youtube"
      style={style}
    >
      <img
        src="/icons/youtube.png"
        alt="YouTube"
      />
    </a>
  );
}