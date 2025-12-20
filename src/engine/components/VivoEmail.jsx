// src/engine/components/VivoEmail.jsx
import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoEmail({ data, style }) {
  const emailCfg = data?.vivos?.email;
  const whatsappMsg = data?.vivos?.whatsapp?.mensaje || "";

  if (!style || !emailCfg?.activo || !emailCfg?.correo) return null;

  const handleClick = () => {
    const to = emailCfg.correo;

    const subject = encodeURIComponent(
      emailCfg.asunto || "Consulta desde El Shopper Digital"
    );

    const body = encodeURIComponent(
      emailCfg.mensaje || whatsappMsg || "Hola, vi su anuncio en El Shopper Digital."
    );

    window.open(`mailto:${to}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <button
      className="o25-vivo o25-latido"
      style={style}
      onClick={handleClick}
    >
      <img src={iconPath("email")} alt="Correo" />
    </button>
  );
}
