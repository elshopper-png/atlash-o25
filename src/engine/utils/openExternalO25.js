// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const returnState = {
    version: "O25_SALIDA_PORTAL_V1",
    pathname: window.location.pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true,
  };

  sessionStorage.setItem(
    "O25_RETURN_STATE",
    JSON.stringify(returnState)
  );

  // En lugar de salir directamente al vivo,
  // primero pasamos por el Portal O25.
  window.location.href = `${window.location.origin}/portal`;
}