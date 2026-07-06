// src/engine/components/VivoUbicacion.jsx
import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoUbicacion({ data, style }) {
  const vivo = data?.vivos?.ubicacion;

  const activoO25 = vivo?.activo;
  const urlO25 = vivo?.url;
  const urlOld = data?.mapa_url;

  const url = urlO25 || urlOld;

  if (vivo && !activoO25) return null;
  if (!url) return null;

  const handleClick = () => {
  console.log("📍 CLICK UBICACION:", url);
  openExternalO25(url, "ubicacion");
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