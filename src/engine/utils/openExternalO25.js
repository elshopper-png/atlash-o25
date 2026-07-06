// src/engine/utils/openExternalO25.js
// Guarda el retorno y envía al Portal O25 persistente

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  const slug =
    parts[0] === "atlash" && parts[1]
      ? parts[1]
      : parts[0] || "saul-garrido";

  const returnState = {
    version: "O25_PORTAL_PERSISTENTE_V1",
    slug,
    pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true
  };

  sessionStorage.setItem("O25_RETURN_STATE", JSON.stringify(returnState));

  window.location.href = "/portal";
}