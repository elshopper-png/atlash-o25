// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25 — Portal funcional

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  // Limpiar sistema O25-R anterior
  sessionStorage.removeItem("O25R_RETURN");
  localStorage.removeItem("O25R_RETURN");

  const returnState = {
    version: "O25_PORTAL_RETORNO_V3",
    pathname: window.location.pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true,
  };

  const serialized = JSON.stringify(returnState);

  sessionStorage.setItem("O25_RETURN_STATE", serialized);
  localStorage.setItem("O25_RETURN_STATE", serialized);

  const pathActual = window.location.pathname || "/";
  window.location.href = `${pathActual}?o25portal=1#o25portal`;
}