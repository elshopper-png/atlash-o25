// ============================================================
// ▶ VivoTiktok — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoTiktok({ data, style }) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO
  if (data?.tiktok) {
    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={() => window.open(data.tiktok, "_blank", "noopener,noreferrer")}
      >
        <img src={iconPath("tiktok")} alt="TikTok" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.tiktok;
  if (!cfg?.activo || !cfg.url) return null;

  return (
    <a
      href={cfg.url}
      target="_blank"
      rel="noopener noreferrer"
      className="o25-vivo o25-latido tiktok"
      style={style}
    >
      <img src={iconPath("tiktok")} alt="TikTok" />
    </a>
  );
}
