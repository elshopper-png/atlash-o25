// src/engine/utils/openExternalO25.js

export function openExternalO25(url, vivo = "externo") {
  sessionStorage.setItem(
    "O25_RETURN_STATE",
    JSON.stringify({
      pathname: window.location.pathname,
      scrollY: window.scrollY,
      timestamp: Date.now(),
      vivo
    })
  );

  if (vivo === "ubicacion") {
    window.location.assign(url);
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}