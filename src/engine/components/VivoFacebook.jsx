// ============================================================
// ▶ VivoFacebook — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoFacebook({ data, style }) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO (no tocar)
  if (data?.facebook) {
    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={() => window.open(data.facebook, "_blank", "noopener,noreferrer")}
      >
        <img src={iconPath("facebook")} alt="Facebook" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.facebook;
  if (!cfg?.activo || !cfg.url) return null;

  return (
    <a
      href={cfg.url}
      target="_blank"
      rel="noopener noreferrer"
      className="o25-vivo o25-latido facebook"
      style={style}
    >
      <img src={iconPath("facebook")} alt="Facebook" />
    </a>
  );
}
