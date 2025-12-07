import React from "react";
import "../../styles/vivo-telefono.css";

export default function VivoTelefono({ data, style, vivoKey }) {
  const numero = data?.vivos?.[vivoKey]?.numero;

  if (!numero) return null;

  const telURL = `tel:${numero}`;

  return (
    <div
      className="o25-telefono-wrapper"
      style={{
        top: style.top,
        left: style.left,
        width: style.width,   // 🔥 CLAVE: se fuerza el width del JSON
        position: "absolute",
        pointerEvents: "auto",
        zIndex: 30,
      }}
    >
      <a href={telURL}>
        <img
          src="/icons/telefono.png"
          alt="Teléfono"
          className="o25-telefono-img o25-telefono-latido"
          draggable={false}
        />
      </a>
    </div>
  );
}
