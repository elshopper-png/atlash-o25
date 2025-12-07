import React from "react";
import "../../styles/vivo-volver.css";

export default function VivoVolver({ data, style }) {
  if (!data?.vivos?.volver?.activo) return null;

  return (
    <div className="o25-volver-wrapper" style={style}>
      <img
        className="o25-volver-img"
        src="/icons/volver.png"
        alt="volver"
        draggable={false}
        onClick={() => {
          window.parent.postMessage({ type: "O25_VOLVER" }, "*");
        }}
      />
    </div>
  );
}
