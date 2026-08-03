// src/engine/components/VivoVideo.jsx

import React from "react";

const iconPath = (name) =>
  `/icons/${name}.png`;

export default function VivoVideo({
  data,
  style,
  vivoKey = "video",
  onClick,
}) {
  if (!style) return null;

  let url = null;

  if (vivoKey === "video1") {
    url = data.video1_url;
  } else if (vivoKey === "video2") {
    url = data.video2_url;
  } else {
    url = data.video_url;
  }

  if (!url) return null;

  const handleClick = async (event) => {
    event.preventDefault();

    /*
     * Si AnuncianteEngine entrega un manejador,
     * lo usamos para registrar Video en Shopper Insight.
     */
    if (onClick) {
      await onClick();
      return;
    }

    /*
     * Compatibilidad con usos antiguos
     * donde VivoVideo se renderiza sin el motor central.
     */
    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      className="o25-vivo"
      style={style}
      onClick={handleClick}
      aria-label="Abrir video"
    >
      <img
        src={iconPath("video")}
        alt="Video"
        draggable={false}
      />
    </button>
  );
}