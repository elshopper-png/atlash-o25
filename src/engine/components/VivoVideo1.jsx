// ============================================================
// 🎬 VivoVideo1 — Segundo botón de video O25
// ============================================================

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoVideo1({ data, style }) {
  // Si falta estilo o no existe la segunda URL → no renderiza
  if (!style || !data?.video1_url) return null;

  const openVideo = () => {
    window.open(data.video1_url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="o25-vivo" style={style} onClick={openVideo}>
      <img src={iconPath("video")} alt="Video 1" />
    </button>
  );
}
