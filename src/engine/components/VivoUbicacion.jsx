// src/engine/components/VivoUbicacion.jsx
import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoUbicacion({ data, style }) {
  const vivo = data?.vivos?.ubicacion;

  // Modelo O25
  const activoO25 = vivo?.activo;
  const urlO25 = vivo?.url;

  // Modelo antiguo (retrocompatibilidad)
  const urlOld = data?.mapa_url;

  // Elegir URL disponible
  const url = urlO25 || urlOld;

  // Si existe bloque O25 pero esta desactivado → no mostrar
  if (vivo && !activoO25) return null;

  // Si no hay URL → no mostrar
  if (!url) return null;

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="o25-vivo o25-latido"
      style={{
        position: "absolute",
        pointerEvents: "auto",
        zIndex: 20,
        ...style
      }}
      onClick={handleClick}
    >
      <img
        src={iconPath("ubicacion")}
        alt="Ubicación"
        style={{ width: "100%", height: "auto", display: "block" }}
        draggable={false}
      />
    </div>
  );
}
