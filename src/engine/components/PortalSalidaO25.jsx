import React, { useEffect, useMemo, useState } from "react";
import AnuncianteEngine from "../AnuncianteEngine.jsx";
import SalidaVivoModal from "./SalidaVivoModal.jsx";

const ICONOS = {
  whatsapp: "/icons/whatsapp.png",
  ubicacion: "/icons/ubicacion.png",
  facebook: "/icons/facebook.png",
  instagram: "/icons/instagram.png",
  tiktok: "/icons/tiktok.png",
  youtube: "/icons/youtube.png",
  web: "/icons/web.png",
  email: "/icons/email.png",
  telefono: "/icons/telefono.png",
  externo: "/icons/web.png",
};

function getSlugFromPath(pathname) {
  const segments = String(pathname || "").split("/").filter(Boolean);
  return segments[segments.length - 1] || "saul-garrido";
}

export default function PortalSalidaO25() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("O25_RETURN_STATE");
    if (!raw) return;

    try {
      setState(JSON.parse(raw));
    } catch (err) {
      console.warn("No se pudo leer O25_RETURN_STATE", err);
    }
  }, []);

  const slug = useMemo(() => {
    return getSlugFromPath(state?.pathname);
  }, [state]);

  const abrirDestino = () => {
    if (!state?.destino) return;

    window.open(state.destino, "_blank", "noopener,noreferrer");
  };

  const volverAlAviso = () => {
    const destino = state?.pathname || "/saul-garrido";
    window.location.href = destino;
  };

  if (!state) {
    return (
      <main style={{ padding: 24 }}>
        No encontramos el aviso. Regresa al inicio.
      </main>
    );
  }

  return (
    <>
      <AnuncianteEngine slug={slug} />

      <SalidaVivoModal
        open={true}
        icon={ICONOS[state.vivo] || ICONOS.externo}
        onContinue={abrirDestino}
        onClose={volverAlAviso}
      />
    </>
  );
}