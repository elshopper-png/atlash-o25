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
      background: rgba(0,0,0,0.62);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      backdrop-filter: blur(6px);
      padding: 24px;
      box-sizing: border-box;
    ">
      <div style="
        background: rgba(15,15,15,0.96);
        color: white;
        padding: 26px 24px;
        border-radius: 24px;
        width: 78%;
        max-width: 340px;
        text-align: center;
        box-shadow: 0 12px 40px rgba(0,0,0,0.45);
        animation: fadeO25 0.25s ease;
        font-family: Arial, sans-serif;
      ">
        <div style="
          font-size: 30px;
          margin-bottom: 12px;
        ">
          ↩️
        </div>

        <div style="
          font-size: 20px;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 10px;
        ">
          Vas a salir del aviso
        </div>

        <div style="
          font-size: 15px;
          opacity: 0.88;
          line-height: 1.45;
        ">
          Usa “Atrás” para regresar
        </div>
      </div>
    </div>

    <style>
      @keyframes fadeO25 {
        from {
          opacity: 0;
          transform: scale(0.92);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    </style>
  `;

  document.body.appendChild(overlay);

  // Abrir externo luego de breve pausa
  setTimeout(() => {
window.location.href = url;
    // limpiar overlay
    setTimeout(() => {
      overlay.remove();
    }, 300);
  }, 1100);
}