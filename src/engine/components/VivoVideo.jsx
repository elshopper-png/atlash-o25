// ============================================================
// 🎬 VivoVideo — Primer botón de video O25
// ============================================================

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
    url = data?.video1_url;
  } else if (vivoKey === "video2") {
    url = data?.video2_url;
  } else {
    url = data?.video_url;
  }

  if (!url) return null;

  const handleClick = async (event) => {
    event.preventDefault();

    /*
     * Abrimos inmediatamente una pestaña vacía
     * para conservar el permiso del clic del usuario.
     */
    const ventanaVideo = window.open(
      "about:blank",
      "_blank"
    );

    /*
     * Registramos el movimiento antes de cargar el video.
     */
    if (onClick) {
      await onClick();
    }

    if (ventanaVideo) {
      ventanaVideo.opener = null;
      ventanaVideo.location.href = url;
      return;
    }

    /*
     * Respaldo si el navegador bloquea la pestaña.
     */
    window.location.href = url;
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