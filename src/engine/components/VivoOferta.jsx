// src/engine/components/VivoOferta.jsx
import React from "react";
import "../../styles/vivo-oferta.css";

export default function VivoOferta({ data, style }) {
  const vivos = data?.vivos || {};
  const cfg = vivos.oferta || {};

  // ¿Oferta activa?
  if (!cfg.activo) return null;

  // Ruta de imagen compatible con ambos modelos
  const ofertaImg = data.oferta?.imagen || cfg.imagen || null;
  if (!ofertaImg) return null;

  // Capturar link
  const ofertaLink = data.oferta?.link || cfg.link || null;

  // Selección de animación
  const anim = cfg.animacion;
  let animClass = "";

  if (anim === "side-to-side") {
    animClass = "o25-oferta-move";
  } else if (anim === "latido-fuerte") {
    animClass = "o25-oferta-move-strong";
  }

  return (
    <div
      className={`o25-oferta-wrapper ${animClass}`}
      style={{
        position: "absolute",
        zIndex: 20,
        pointerEvents: "auto",
        ...style,
      }}
      onClick={() => {
        if (ofertaLink) window.open(ofertaLink, "_blank");
      }}
    >
      <img
        src={ofertaImg}
        alt="oferta"
        className="o25-oferta-img"
        draggable={false}
      />
    </div>
  );
}
