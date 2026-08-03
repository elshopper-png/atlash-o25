// ============================================================
// 🎬 VivoVideo1 — Segundo botón de video O25
// ============================================================

import React from "react";

const iconPath = (name) =>
  `/icons/${name}.png`;

export default function VivoVideo1({
  data,
  style,
  onClick,
}) {
  if (!style || !data?.video1_url) {
    return null;
  }

  const handleClick = async (event) => {
    event.preventDefault();

    /*
     * Primero registra en Shopper Insight.
     */
    if (onClick) {
      await onClick();
    }

    /*
     * Después abre el segundo video.
     */
    window.open(
      data.video1_url,
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
      aria-label="Abrir video 1"
    >
      <img
        src={iconPath("video")}
        alt="Video 1"
        draggable={false}
      />
    </button>
  );
}