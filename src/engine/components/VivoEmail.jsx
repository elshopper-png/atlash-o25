// src/engine/components/VivoEmail.jsx

import React from "react";
import { openExternalO25 } from "../utils/openExternalO25";

const iconPath = (name) => `/icons/${name}.png`;

export default function VivoEmail({
  data,
  style,
  onRequestExternal,
}) {
  const emailCfg = data?.vivos?.email;
  const whatsappMsg = data?.vivos?.whatsapp?.mensaje || "";

  if (!style || !emailCfg?.activo || !emailCfg?.email) return null;

  const to = emailCfg.email;

  const subject = encodeURIComponent(
    emailCfg.asunto || "Consulta desde El Shopper Digital"
  );

  const body = encodeURIComponent(
    emailCfg.mensaje ||
      whatsappMsg ||
      "Hola, vi su anuncio en El Shopper Digital."
  );

  const url = `mailto:${to}?subject=${subject}&body=${body}`;

  const handleClick = (e) => {
    e.preventDefault();

    onRequestExternal?.({
      icon: iconPath("email"),
      open: () => openExternalO25(url, "email"),
    });
  };

  return (
    <button
      className="o25-vivo o25-latido"
      style={style}
      onClick={handleClick}
    >
      <img
        src={iconPath("email")}
        alt="Correo"
      />
    </button>
  );
}