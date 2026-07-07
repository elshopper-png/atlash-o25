// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25
// Versión móvil estable: evita pestaña intermedia rota en Android/iOS

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const returnState = {
    version: "O25_SALIDA_MODAL_V3_MOBILE_DIRECT",
    pathname: window.location.pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true,
  };

  try {
    sessionStorage.setItem("O25_RETURN_STATE", JSON.stringify(returnState));
  } catch (error) {
    console.warn("O25_RETURN_STATE no pudo guardarse:", error);
  }

    // Salida móvil directa sin dejar pantalla intermedia en historial
  window.location.replace(url);
}