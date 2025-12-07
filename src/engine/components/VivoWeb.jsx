// ============================================================
// ▶ VivoWeb — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoWeb({ data, style }) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO
  if (data?.web) {
    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={() => window.open(data.web, "_blank", "noopener,noreferrer")}
      >
        <img src={iconPath("web")} alt="Web" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.web;
  if (!cfg?.activo || !cfg.url) return null;

  return (
    <a
      href={cfg.url}
      target="_blank"
      rel="noopener noreferrer"
      className="o25-vivo o25-latido web"
      style={style}
    >
      <img src={iconPath("web")} alt="Web" />
    </a>
  );
}
