// ============================================================
// ▶ VivoInstagram — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoInstagram({ data, style }) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO
  if (data?.instagram) {
    const handleClick = () => {
      openExternalO25(data.instagram, "instagram");
    };

    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={handleClick}
      >
        <img src={iconPath("instagram")} alt="Instagram" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.instagram;
  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();
    openExternalO25(cfg.url, "instagram");
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido instagram"
      style={style}
    >
      <img src={iconPath("instagram")} alt="Instagram" />
    </a>
  );
}