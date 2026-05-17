// ============================================================
// ▶ VivoFacebook — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoFacebook({ data, style }) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO
  if (data?.facebook) {
    const handleClick = () => {
      openExternalO25(data.facebook, "facebook");
    };

    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={handleClick}
      >
        <img src={iconPath("facebook")} alt="Facebook" />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.facebook;
  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();
    openExternalO25(cfg.url, "facebook");
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido facebook"
      style={style}
    >
      <img src={iconPath("facebook")} alt="Facebook" />
    </a>
  );
}