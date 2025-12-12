// src/engine/components/VivoVideo.jsx
import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoVideo({ data, style, vivoKey }) {
  if (!style) return null;

  // Seleccionar URL correcta
  let url = null;

  if (vivoKey === "video1") {
    url = data.video1_url;
  } else if (vivoKey === "video2") {
    url = data.video2_url;
  } else {
    url = data.video_url; // fallback para avisos antiguos
  }

  if (!url) return null;

  const openVideo = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button className="o25-vivo" style={style} onClick={openVideo}>
      <img src={iconPath("video")} alt="Video" />
    </button>
  );
}
