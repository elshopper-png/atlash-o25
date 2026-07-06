// ============================================================
// ▶ VivoTiktok — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoTiktok({ data, style }) {
  if (!style) return null;

  if (data?.tiktok) {
    const handleClick = () => {
      openExternalO25(data.tiktok, "tiktok");
    };

    return (
      <button className="o25-vivo o25-latido" style={style} onClick={handleClick}>
        <img src={iconPath("tiktok")} alt="TikTok" />
      </button>
    );
  }

  const cfg = data?.vivos?.tiktok;
  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();
    openExternalO25(cfg.url, "tiktok");
  };

  return (
    <a href={cfg.url} onClick={handleClick} className="o25-vivo o25-latido tiktok" style={style}>
      <img src={iconPath("tiktok")} alt="TikTok" />
    </a>
  );
}