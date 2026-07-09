// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25 — Portal funcional por query

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const returnState = {
    version: "O25_PORTAL_RETORNO_V2",
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

  window.location.href = "/?o25portal=1";
}