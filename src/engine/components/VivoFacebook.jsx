// ============================================================
// ▶ VivoFacebook — Compatible con MODELO ANTIGUO + O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoFacebook({ data, style }) {
  if (!style) return null;

  const guardarRetornoO25 = () => {
    sessionStorage.setItem(
      "O25_RETURN_STATE",
      JSON.stringify({
        pathname: window.location.pathname,
        scrollY: window.scrollY,
        timestamp: Date.now(),
        vivo: "facebook"
      })
    );
  };

  // 🟣 MODELO ANTIGUO
  if (data?.facebook) {
    const handleClick = () => {
      guardarRetornoO25();
      window.open(data.facebook, "_blank", "noopener,noreferrer");
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
    guardarRetornoO25();
    window.open(cfg.url, "_blank", "noopener,noreferrer");
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