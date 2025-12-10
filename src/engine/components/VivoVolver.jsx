import React from "react";
import "../../styles/vivo-volver.css";

export default function VivoVolver({ data, style }) {
  if (!data?.vivos?.volver?.activo) return null;

  const handleClick = () => {
    console.log("⬅️ Enviando O25_VOLVER desde ATLASH");
    
    // Enviar señal universal al host (CRA)
    window.parent.postMessage(
      {
        type: "O25_VOLVER",
        slug: data.slug || null, // opcional, por si se quiere rastrear
      },
      "*"
    );
  };

  return (
    <div className="o25-volver-wrapper" style={style} onClick={handleClick}>
      <img
        className="o25-volver-img"
        src="/icons/volver.png"
        alt="volver"
        draggable={false}
      />
    </div>
  );
}
