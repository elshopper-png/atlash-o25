// src/engine/components/VivoCarrusel.jsx
import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoCarrusel({ style, onClick, data }) {
  // El carrusel solo se muestra si existe data.gallery
  if (!style || !Array.isArray(data?.gallery) || data.gallery.length === 0) {
    return null;
  }

  return (
    <button className="o25-vivo" style={style} onClick={onClick}>
      <img src={iconPath("carrusel")} alt="Carrusel" />
    </button>
  );
}
