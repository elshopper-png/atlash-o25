// src/engine/utils/openExternalO25.js
// Punto único de salida externa O25-R

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const returnState = {
    version: "O25R_V1",
    active: true,
    vivo,
    destino: url,
    createdAt: Date.now(),
  };

  const serialized = JSON.stringify(returnState);

  sessionStorage.setItem("O25R_RETURN", serialized);
  localStorage.setItem("O25R_RETURN", serialized);

  const nuevaVentana = window.open(url, "_blank");

  if (!nuevaVentana) {
    window.location.href = url;
  }
}