// src/engine/components/VivoEmail.jsx
import React from "react";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoEmail({ data, style }) {
  const emailCfg = data?.vivos?.email;

  if (!style || !emailCfg?.activo) return null;

  const handleClick = () => {
    const to = emailCfg.email || "";
    const subject = encodeURIComponent(emailCfg.asunto || "");
    const body = encodeURIComponent(emailCfg.mensaje || "");
    window.open(`mailto:${to}?subject=${subject}&body=${body}`);
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
