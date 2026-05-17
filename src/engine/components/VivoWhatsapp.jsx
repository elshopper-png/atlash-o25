import React from "react";
import "../../styles/latidos.css";

export default function VivoWhatsapp({ data, style, vivoKey = "whatsapp" }) {
  const vivoConfig = data?.vivos?.[vivoKey];

  const numeroO25 = vivoConfig?.numero;
  const mensajeO25 = vivoConfig?.mensaje;
  const activoO25 = vivoConfig?.activo;

  const numeroOld = data?.whatsapp;
  const mensajeOld = data?.whatsappMessage;

  const numero = numeroO25 || numeroOld;
  const mensaje = mensajeO25 || mensajeOld;

  if (vivoConfig && !activoO25) return null;
  if (!numero) return null;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(
    mensaje || ""
  )}`;

  const handleClick = (e) => {
    e.preventDefault();

    sessionStorage.setItem(
      "O25_RETURN_STATE",
      JSON.stringify({
        pathname: window.location.pathname,
        scrollY: window.scrollY,
        timestamp: Date.now(),
        vivo: vivoKey
      })
    );

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="o25-vivo o25-latido"
      style={{
        position: "absolute",
        pointerEvents: "auto",
        zIndex: 20,
        ...style,
      }}
    >
      <a href={url} onClick={handleClick}>
        <img
          src="/icons/whatsapp.png"
          alt="WhatsApp"
          style={{ width: "100%", height: "auto", display: "block" }}
          draggable={false}
        />
      </a>
    </div>
  );
}