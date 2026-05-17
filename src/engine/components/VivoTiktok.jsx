// ============================================================
// ▶ VivoTiktok — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoTiktok({ data, style }) {
  if (!style) return null;

  const guardarRetornoO25 = () => {
    sessionStorage.setItem(
      "O25_RETURN_STATE",
      JSON.stringify({
        pathname: window.location.pathname,
        scrollY: window.scrollY,
        timestamp: Date.now(),
        vivo: "tiktok"
      })
    );
  };

  // 🟣 MODELO ANTIGUO
  if (data?.tiktok) {
    const handleClick = () => {
      guardarRetornoO25();
      window.open(data.tiktok, "_blank", "noopener,noreferrer");
    };

    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={handleClick}
      >
        <img src={iconPath("tiktok")} alt="TikTok" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.tiktok;
  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();
    guardarRetornoO25();
    window.open(cfg.url, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido tiktok"
      style={style}
    >
      <img src={iconPath("tiktok")} alt="TikTok" />
    </a>
  );
}