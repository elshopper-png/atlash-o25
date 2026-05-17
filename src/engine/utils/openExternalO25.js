export function openExternalO25(url, vivo = "externo") {
  // Guardar estado actual
  sessionStorage.setItem(
    "O25_RETURN_STATE",
    JSON.stringify({
      pathname: window.location.pathname,
      scrollY: window.scrollY,
      timestamp: Date.now(),
      vivo
    })
  );

  // Crear overlay
  const overlay = document.createElement("div");

  overlay.innerHTML = `
    <div style="
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(4px);
    ">
      <div style="
        background: rgba(20,20,20,0.92);
        color: white;
        padding: 16px 22px;
        border-radius: 18px;
        font-size: 15px;
        font-family: sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        text-align: center;
      ">
        ↩️ Usa “Atrás” para volver al aviso
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Abrir externo luego de breve pausa
  setTimeout(() => {
    window.open(url, "_blank", "noopener,noreferrer");

    // limpiar overlay
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }, 900);
}