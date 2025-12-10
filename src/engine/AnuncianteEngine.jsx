// ============================================================
// 🧬 AnuncianteEngine.jsx — Motor único de avisos O25 (CORREGIDO)
// ============================================================

import React, { useState, useEffect } from "react";
import { MapaVivosO25 } from "./MapaVivosO25";
import { VIVO_REGISTRY } from "./VivoRegistryO25";

import "../styles/vivos-o25.css";
import "../styles/latidos.css";

import CarruselO25 from "./components/CarruselO25.jsx";



export default function AnuncianteEngine({ slug = "saul-garrido" }) {
  const [data, setData] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

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
// Fotos del carrusel: antiguo (data.gallery) + nuevo (vivos.carrusel.fotos)
  const carruselFotos =
    (vivos.carrusel?.fotos && vivos.carrusel.fotos.length
      ? vivos.carrusel.fotos
      : data.gallery) || [];

  // Handlers para overlays (galería y video)
  const handleGalleryOpen = () => setShowGallery(true);
  const handleVideoOpen = () => setShowVideo(true);
  const closeOverlays = () => {
    setShowGallery(false);
    setShowVideo(false);
  };

  // Props extra para algunos vivos
  const extraPropsByKey = (key) => {
    if (key === "carrusel") return { onClick: handleGalleryOpen };
    if (key === "video") return { onClick: handleVideoOpen };
    return {};
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

        {/* 🔥 Render universal de vivos con vivoKey incluido */}
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

      {/* Carrusel (overlay) */}
{Array.isArray(data.gallery) && data.gallery.length > 0 && (
  <CarruselO25
    open={showGallery}
    onClose={closeOverlays}
    fotos={data.gallery}
        />
      )}

      {/* Video (overlay) */}
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
