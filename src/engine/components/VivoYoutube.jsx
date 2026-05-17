// ============================================================
// ▶ VivoYoutube — Botón de YouTube para OMEGA-25
// ============================================================

import React from "react";

export default function VivoYoutube({ data, style }) {
  const vivos = data?.vivos || {};
  const cfg = vivos.youtube;

  if (!cfg?.activo) return null;
  if (!cfg.url) return null;

  const icon = "/icons/youtube.png";

  const guardarRetornoO25 = () => {
    sessionStorage.setItem(
      "O25_RETURN_STATE",
      JSON.stringify({
        pathname: window.location.pathname,
        scrollY: window.scrollY,
        timestamp: Date.now(),
        vivo: "youtube"
      })
    );
  };

  const handleClick = (e) => {
    e.preventDefault();

    guardarRetornoO25();

    window.open(cfg.url, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido youtube"
      style={style}
    >
      <img src={icon} alt="YouTube" />
    </a>
  );
}