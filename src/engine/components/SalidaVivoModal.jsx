import React from "react";
import "../../styles/salida-vivo-modal.css";

export default function SalidaVivoModal({ open, icon, onContinue, onClose }) {
  if (!open) return null;

  return (
    <div className="salida-vivo-backdrop" onClick={onClose}>
      <div className="salida-vivo-card" onClick={(e) => e.stopPropagation()}>
        <img
          src={icon}
          alt=""
          className="salida-vivo-logo"
          draggable={false}
        />

        <button className="salida-vivo-continuar" onClick={onContinue}>
          Continuar
        </button>

        <button className="salida-vivo-volver" onClick={onClose}>
          Volver
        </button>
      </div>
    </div>
  );
}