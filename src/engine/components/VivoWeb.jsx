// ============================================================
// ▶ VivoWeb — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoWeb({
  data,
  style,
  onRequestExternal,
}) {
  if (!style) return null;

  // 🟣 MODELO ANTIGUO
  if (data?.web) {

    const handleClick = (e) => {
      e.preventDefault();

      onRequestExternal?.({
        icon: iconPath("web"),
        open: () => openExternalO25(data.web, "web"),
      });
    };

    return (
      <button
        className="o25-vivo o25-latido"
        style={style}
        onClick={handleClick}
      >
        <img
          src={iconPath("web")}
          alt="Web"
        />
      </button>
    );
  }

  // 🟢 MODELO O25
  const cfg = data?.vivos?.web;

  if (!cfg?.activo || !cfg.url) return null;

  const handleClick = (e) => {
    e.preventDefault();

    onRequestExternal?.({
      icon: iconPath("web"),
      open: () => openExternalO25(cfg.url, "web"),
    });
  };

  return (
    <a
      href={cfg.url}
      onClick={handleClick}
      className="o25-vivo o25-latido web"
      style={style}
    >
      <img
        src={iconPath("web")}
        alt="Web"
      />
    </a>
  );
}