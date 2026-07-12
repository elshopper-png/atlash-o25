// ============================================================
// 🧬 AnuncianteEngine.jsx — Motor único de avisos O25-R
// ============================================================

import React, { useState, useEffect } from "react";
import { MapaVivosO25 } from "./MapaVivosO25";
import { VIVO_REGISTRY } from "./VivoRegistryO25";

import "../styles/vivos-o25.css";
import "../styles/latidos.css";

import CarruselO25 from "./components/CarruselO25.jsx";
import SalidaVivoModal from "./components/SalidaVivoModal.jsx";

export default function AnuncianteEngine({ slug = "saul-garrido" }) {
  const [data, setData] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [salidaVivo, setSalidaVivo] = useState(null);

  // 🟡 O25-R: detectar regreso desde vivo externo
  useEffect(() => {
    const restoreO25R = () => {
      const raw =
  sessionStorage.getItem("O25R_RETURN") ||
  localStorage.getItem("O25R_RETURN");
      if (!raw) return;

      try {
        const state = JSON.parse(raw);

        if (!state?.active) return;

        const age = Date.now() - Number(state.createdAt || 0);
        if (age > 10 * 60 * 1000) {
          sessionStorage.removeItem("O25R_RETURN");
localStorage.removeItem("O25R_RETURN");
          return;
        }

        setSalidaVivo((actual) => {
          if (actual?.modoRetorno) return actual;

          return {
            icon: state.payload?.icon || null,
            label: state.payload?.label || null,
            title: state.payload?.title || null,
            tipo: state.payload?.tipo || null,
            vivoKey: state.payload?.vivoKey || null,
            modoRetorno: true,
          };
        });
      } catch (err) {
        console.warn("⚠️ Error restaurando O25R_RETURN", err);
        sessionStorage.removeItem("O25R_RETURN");
localStorage.removeItem("O25R_RETURN");
      }
    };

    window.addEventListener("focus", restoreO25R);
    window.addEventListener("pageshow", restoreO25R);

    const handleVisibility = () => {
      if (!document.hidden) restoreO25R();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    restoreO25R();

    return () => {
      window.removeEventListener("focus", restoreO25R);
      window.removeEventListener("pageshow", restoreO25R);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // 🧭 Cargar ficha desde /public/fichas
  useEffect(() => {
    const loadFicha = async () => {
      try {
        const url = `/fichas/${slug}.json`;
        console.log("Cargando ficha desde:", url);

        const res = await fetch(url);

        if (!res.ok) {
          console.error("❌ No existe la ficha:", url);
          setData(null);
          return;
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ Error cargando ficha:", slug, err);
        setData(null);
      }
    };

    loadFicha();
  }, [slug]);

  if (!data) {
    return <div style={{ padding: 20 }}>Cargando aviso…</div>;
  }

  const vivos = data.vivos || {};
  const zonas = MapaVivosO25(data);

  const carruselFotos =
    (vivos.carrusel?.fotos && vivos.carrusel.fotos.length
      ? vivos.carrusel.fotos
      : data.gallery) || [];

  const handleGalleryOpen = () => setShowGallery(true);
  const handleVideoOpen = () => setShowVideo(true);

  const closeOverlays = () => {
    setShowGallery(false);
    setShowVideo(false);
  };

  const handleRequestExternal = (payload) => {
  if (!payload?.open) return;

  payload.open();
};

  const closeSalidaVivo = () => {
    sessionStorage.removeItem("O25R_RETURN");
localStorage.removeItem("O25R_RETURN");
    setSalidaVivo(null);
  };

  const handleContinueSalida = () => {
    if (salidaVivo?.modoRetorno) {
      sessionStorage.removeItem("O25R_RETURN");
localStorage.removeItem("O25R_RETURN");
      setSalidaVivo(null);
      return;
    }

    if (!salidaVivo?.open) return;

    const payloadSeguro = {
      icon: salidaVivo.icon || null,
      label: salidaVivo.label || null,
      title: salidaVivo.title || null,
      tipo: salidaVivo.tipo || null,
      vivoKey: salidaVivo.vivoKey || null,
    };

    const estadoO25R = JSON.stringify({
  active: true,
  payload: payloadSeguro,
  createdAt: Date.now(),
});

sessionStorage.setItem("O25R_RETURN", estadoO25R);
localStorage.setItem("O25R_RETURN", estadoO25R);

    salidaVivo.open();
    setSalidaVivo(null);
  };

  const extraPropsByKey = (key) => {
    if (key === "carrusel") return { onClick: handleGalleryOpen };
    if (key === "video") return { onClick: handleVideoOpen };

    return {
      onRequestExternal: handleRequestExternal,
    };
  };

  return (
    <div className="o25-wrapper">
      <div className="o25-flyer-shell">
        <img
          src={data.flyer}
          alt={data.nombre}
          className="o25-flyer"
          draggable={false}
        />

        {Object.entries(zonas).map(([key, style]) => {
          if (!style) return null;

          const VivoComponent = VIVO_REGISTRY[key];
          if (!VivoComponent) return null;

          const cfg = vivos[key] || {};
          const extra = extraPropsByKey(key);

          return (
            <VivoComponent
              key={key}
              vivoKey={key}
              data={data}
              config={cfg}
              style={style}
              {...(extra || {})}
            />
          );
        })}
      </div>

      <SalidaVivoModal
        open={Boolean(salidaVivo)}
        icon={salidaVivo?.icon}
        modoRetorno={Boolean(salidaVivo?.modoRetorno)}
        onContinue={handleContinueSalida}
        onClose={closeSalidaVivo}
      />

      {Array.isArray(carruselFotos) && carruselFotos.length > 0 && (
        <CarruselO25
          open={showGallery}
          onClose={closeOverlays}
          fotos={carruselFotos}
        />
      )}

      {vivos.video?.activo && showVideo && (
        <VIVO_REGISTRY.video
          data={data}
          config={vivos.video}
          open={showVideo}
          onClose={closeOverlays}
        />
      )}
    </div>
  );
}