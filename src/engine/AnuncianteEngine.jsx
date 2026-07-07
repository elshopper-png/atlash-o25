// ============================================================
// 🧬 AnuncianteEngine.jsx — Motor único de avisos O25 (CORREGIDO)
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

  // 🧭 Restaurador O25: al volver desde un vivo externo
  useEffect(() => {
    const restoreO25Return = () => {
      alert("O25 volvió a ejecutar JS");
      
      const raw = sessionStorage.getItem("O25_RETURN_STATE");
      if (!raw) return;

      try {
        const state = JSON.parse(raw);
        if (!state?.retornoPendiente) return;

        const isSamePath = state.pathname === window.location.pathname;

        if (!isSamePath && state.pathname) {
  window.location.href = state.pathname;
  return;
}

        if (state?.scrollY !== undefined) {
          setTimeout(() => {
            window.scrollTo({
              top: Number(state.scrollY) || 0,
              behavior: "instant",
            });
          }, 250);
        }

        sessionStorage.setItem(
  "O25_RETURN_STATE",
  JSON.stringify({
    ...state,
    retornoPendiente: true,
    restoredAt: Date.now(),
  })
);
      } catch (err) {
        console.warn("⚠️ No se pudo restaurar O25_RETURN_STATE", err);
      }
    };

    restoreO25Return();

    window.addEventListener("focus", restoreO25Return);
    window.addEventListener("pageshow", restoreO25Return);

    const handleVisibilityChange = () => {
      if (!document.hidden) restoreO25Return();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", restoreO25Return);
      window.removeEventListener("pageshow", restoreO25Return);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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

  // ⏳ Mientras no hay data
  if (!data) {
    return <div style={{ padding: 20 }}>Cargando aviso…</div>;
  }

  const vivos = data.vivos || {};
  const zonas = MapaVivosO25(data);

  console.log("🟦 VIVOSMAP =", data.vivosMap);
  console.log("🟦 ZONAS CALCULADAS =", zonas);

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
    setSalidaVivo(payload);
  };

  const closeSalidaVivo = () => {
    setSalidaVivo(null);
  };

  const handleContinueSalida = () => {
    if (!salidaVivo?.open) return;
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