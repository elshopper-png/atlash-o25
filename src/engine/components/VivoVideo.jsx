// src/engine/components/VivoVideo.jsx
// ----------------------------------
// Versión franciscana O25:
// - Un solo modelo de video para todos los avisos.
// - No usa modales ni estados.
// - No toca el Engine, ni ZonasAncla, ni CSS.
// - Abre el video en una pestaña nueva del navegador.

import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoVideo({ data, style }) {
  // Si no hay estilo o no hay URL de video, no se muestra nada
  if (!style || !data?.video_url) return null;

  const openVideo = () => {
    // Abre el video en una pestaña nueva
    // (mismo comportamiento para Saúl, Providencia, Imprenta, etc.)
    window.open(data.video_url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="o25-vivo" style={style} onClick={openVideo}>
      <img src={iconPath("video")} alt="Video" />
    </button>
  );
}
