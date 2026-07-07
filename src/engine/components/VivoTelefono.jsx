import React from "react";
import "../../styles/vivo-telefono.css";
import { openExternalO25 } from "../utils/openExternalO25";

export default function VivoTelefono({
  data,
  style,
  vivoKey,
  onRequestExternal,
}) {
  const numero = data?.vivos?.[vivoKey]?.numero;

  if (!numero) return null;

  const telURL = `tel:${numero}`;

  const handleClick = (e) => {
    e.preventDefault();

    onRequestExternal?.({
      icon: "/icons/telefono.png",
      open: () => openExternalO25(telURL, "telefono"),
    });
  };

  return (
    <div
      className="o25-telefono-wrapper"
      style={{
        top: style.top,
        left: style.left,
        width: style.width,
        position: "absolute",
        pointerEvents: "auto",
        zIndex: 30,
      }}
    >
      <a href={telURL} onClick={handleClick}>
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