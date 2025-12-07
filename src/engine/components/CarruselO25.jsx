import React, { useState } from "react";
import "../../styles/carrusel-o25.css";

export default function CarruselO25({ open, onClose, fotos = [] }) {
  const [index, setIndex] = useState(0);

  if (!open) return null;

  const prev = () =>
    setIndex((i) => (i === 0 ? fotos.length - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === fotos.length - 1 ? 0 : i + 1));

  return (
    <div className="o25-gallery-overlay">
      {/* BOTÓN CERRAR */}
      <button className="o25-gallery-close" onClick={onClose}>
        ✕
      </button>

      {/* FLECHA IZQUIERDA */}
      {fotos.length > 1 && (
        <button className="o25-gallery-arrow left" onClick={prev}>
          ‹
        </button>
      )}

      {/* IMAGEN PRINCIPAL */}
      <img
        src={fotos[index]}
        alt="foto"
        className="o25-gallery-img"
        draggable={false}
      />

      {/* FLECHA DERECHA */}
      {fotos.length > 1 && (
        <button className="o25-gallery-arrow right" onClick={next}>
          ›
        </button>
      )}

      {/* 🔵 BULLETS */}
      <div className="o25-gallery-bullets">
        {fotos.map((_, i) => (
          <span
            key={i}
            className={`bullet ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
