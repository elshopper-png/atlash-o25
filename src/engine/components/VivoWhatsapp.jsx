import React from "react";
import "../../styles/latidos.css";

export default function VivoWhatsapp({ data, style, vivoKey = "whatsapp" }) {
  const vivoConfig = data?.vivos?.[vivoKey];

  // Prioridad 1 — Modelo O25
  const numeroO25 = vivoConfig?.numero;
  const mensajeO25 = vivoConfig?.mensaje;
  const activoO25 = vivoConfig?.activo;

  // Prioridad 2 — Modelo clásico
  const numeroOld = data?.whatsapp;
  const mensajeOld = data?.whatsappMessage;

  // Elegir número disponible
  const numero = numeroO25 || numeroOld;
  const mensaje = mensajeO25 || mensajeOld;

  // Si modelo O25 existe → respetar su "activo"
  if (vivoConfig && !activoO25) return null;

  // Si no hay número → no mostrar
  if (!numero) return null;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(
    mensaje || ""
  )}`;

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
      <a href={url} target="_blank" rel="noopener noreferrer">
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
