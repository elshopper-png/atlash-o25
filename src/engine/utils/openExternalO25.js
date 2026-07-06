// src/engine/utils/openExternalO25.js
// Portal de salida O25 — guarda el punto exacto de retorno antes de abrir un vivo externo

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter(Boolean);
  const slug =
    parts[0] === "atlash" && parts[1]
      ? parts[1]
      : parts[0] || "saul-garrido";

  const returnState = {
    version: "O25_RETURN_V2",
    slug,
    pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true
  };

  sessionStorage.setItem("O25_RETURN_STATE", JSON.stringify(returnState));

  window.open(url, "_blank", "noopener,noreferrer");
}