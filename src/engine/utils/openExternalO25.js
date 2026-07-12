// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25 — apertura directa

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

  // Android WebView intercepta este enlace y abre la aplicación externa.
  window.location.href = url;
}