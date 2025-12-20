// ============================================================
// 🧭 MapaVivosO25 — Motor híbrido (compatible con ambos modelos)
// ============================================================

export function MapaVivosO25(data) {
  const slug = data?.slug;
  const vivos = data?.vivos || {};
  const mapa = data?.vivosMap;

  // ============================================================
  // 🟦 1) NUEVO MODELO — Si existe vivosMap, usarlo (Elevarq, Rios, etc.)
  // ============================================================
  if (mapa) {
    const zonas = {};

    Object.keys(mapa).forEach((key) => {
      const vivoCfg = vivos[key];

      // 🔹 Teléfonos: si existe numero → mostrar siempre
      if (key.startsWith("telefono")) {
        if (vivoCfg?.numero) {
          zonas[key] = mapa[key];
        }
        return;
      }

      // 🔹 EMAIL — tratamiento explícito O25
      if (key === "email") {
        if (vivoCfg?.activo && vivoCfg?.email) {
          zonas[key] = mapa[key];
        }
        return;
      }

      // 🔹 Regla general para otros vivos
      if (vivoCfg?.activo) {
        zonas[key] = mapa[key];
      }
    });

    return zonas;
  }

  // ============================================================
  // 🟥 2) MODELO ANTIGUO — Saúl Garrido (NO TOCAR)
  // ============================================================
  if (slug === "saul-garrido") {
    return {
      ubicacion: vivos.ubicacion?.activo
        ? { top: "63%", left: "10%", width: "11%" }
        : null,

      whatsapp: vivos.whatsapp?.activo
        ? { top: "63%", left: "78%", width: "11%" }
        : null,

      carrusel: vivos.carrusel?.activo
        ? {
            top: "67%",
            left: "26%",
            width: "49%",
            transform: "translateX(-50%)",
          }
        : null,

      video: vivos.video?.activo
        ? {
            top: "67%",
            left: "60%",
            width: "26%",
            transform: "translateX(-50%)",
          }
        : null,

      oferta: vivos.oferta?.activo
        ? { top: "79%", left: "60%", width: "20%" }
        : null,

      volver: { top: "92.5%", left: "82%", width: "16%" },
    };
  }

  // ============================================================
  // 🟪 3) MODELO ANTIGUO — Burga (NO TOCAR)
  // ============================================================
  if (slug === "burga") {
    return {
      ubicacion: vivos.ubicacion?.activo
        ? { top: "68.4%", left: "17%", width: "12%" }
        : null,

      whatsapp: vivos.whatsapp?.activo
        ? { top: "75%", left: "54%", width: "11%" }
        : null,

      carrusel: vivos.carrusel?.activo
        ? {
            top: "78%",
            left: "32%",
            width: "60%",
            transform: "translateX(-50%)",
          }
        : null,

      video: vivos.video?.activo
        ? {
            top: "66.3%",
            left: "59%",
            width: "28%",
            transform: "translateX(-50%)",
          }
        : null,

      oferta: vivos.oferta?.activo
        ? { top: "77%", left: "61%", width: "41%" }
        : null,

      volver: { top: "93.5%", left: "82%", width: "16%" },
    };
  }

  // ============================================================
  // 🟩 4) PLANTILLA ANTIGUA PARA OTROS CASOS
  // ============================================================
  return {
    ubicacion: vivos.ubicacion?.activo
      ? { top: "68.4%", left: "47%", width: "12%" }
      : null,

    whatsapp: vivos.whatsapp?.activo
      ? { top: "75%", left: "50%", width: "11%" }
      : null,

    carrusel: vivos.carrusel?.activo
      ? {
          top: "30%",
          left: "12%",
          width: "60%",
          transform: "translateX(-50%)",
        }
      : null,

    video: vivos.video?.activo
      ? {
          top: "66.3%",
          left: "59%",
          width: "28%",
          transform: "translateX(-50%)",
        }
      : null,

    oferta: vivos.oferta?.activo
      ? { top: "77%", left: "60%", width: "40%" }
      : null,

    volver: { top: "82.5%", left: "82%", width: "16%" },
  };
}
