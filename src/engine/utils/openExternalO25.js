// src/engine/utils/openExternalO25.js
// Portal de salida O25 — versión visual con retorno al aviso

const NOMBRES_VIVOS = {
  whatsapp: "WhatsApp",
  ubicacion: "Ubicación",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  web: "Web",
  externo: "enlace externo"
};

export function openExternalO25(url, vivo = "externo") {
  if (!url) return;

  const pathname = window.location.pathname;
  const parts = pathname.split("/").filter(Boolean);

  const slug =
    parts[0] === "atlash" && parts[1]
      ? parts[1]
      : parts[0] || "saul-garrido";

  const returnState = {
    version: "O25_RETURN_PORTAL_V1",
    slug,
    pathname,
    scrollY: window.scrollY || 0,
    vivo,
    destino: url,
    timestamp: Date.now(),
    retornoPendiente: true
  };

  sessionStorage.setItem("O25_RETURN_STATE", JSON.stringify(returnState));

  mostrarPortalSalidaO25(url, vivo, returnState);
}

function mostrarPortalSalidaO25(url, vivo, state) {
  const anterior = document.getElementById("o25-portal-salida");
  if (anterior) anterior.remove();

  const nombreVivo = NOMBRES_VIVOS[vivo] || NOMBRES_VIVOS.externo;

  const portal = document.createElement("div");
  portal.id = "o25-portal-salida";

  portal.innerHTML = `
    <div class="o25-portal-backdrop">
      <div class="o25-portal-card">
        <button class="o25-portal-close" aria-label="Cerrar">×</button>

        <div class="o25-portal-mini">Shopper Digital</div>

        <h2>Está saliendo hacia ${nombreVivo}</h2>

        <p>
          Cuando termine de navegar, puede regresar fácilmente
          al aviso del anunciante.
        </p>

        <button class="o25-portal-open">
          Abrir ${nombreVivo}
        </button>

        <button class="o25-portal-return">
          ← Volver al aviso
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(portal);

  const style = document.createElement("style");
  style.id = "o25-portal-style";
  style.innerHTML = `
    #o25-portal-salida {
      position: fixed;
      inset: 0;
      z-index: 999999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .o25-portal-backdrop {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.62);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 22px;
      box-sizing: border-box;
    }

    .o25-portal-card {
      width: 100%;
      max-width: 360px;
      background: #111;
      color: #fff;
      border-radius: 22px;
      padding: 26px 22px 22px;
      text-align: center;
      box-shadow: 0 18px 50px rgba(0,0,0,.35);
      position: relative;
    }

    .o25-portal-close {
      position: absolute;
      top: 10px;
      right: 14px;
      border: 0;
      background: transparent;
      color: #fff;
      font-size: 28px;
      cursor: pointer;
      opacity: .75;
    }

    .o25-portal-mini {
      font-size: 13px;
      opacity: .7;
      margin-bottom: 10px;
      letter-spacing: .4px;
    }

    .o25-portal-card h2 {
      font-size: 23px;
      line-height: 1.2;
      margin: 0 0 12px;
    }

    .o25-portal-card p {
      font-size: 15px;
      line-height: 1.45;
      opacity: .82;
      margin: 0 0 22px;
    }

    .o25-portal-open,
    .o25-portal-return {
      width: 100%;
      border: 0;
      border-radius: 999px;
      padding: 14px 18px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    .o25-portal-open {
      background: #ffffff;
      color: #111;
      font-weight: 700;
    }

    .o25-portal-return {
      background: rgba(255,255,255,.12);
      color: #fff;
    }
  `;

  if (!document.getElementById("o25-portal-style")) {
    document.head.appendChild(style);
  }

  portal.querySelector(".o25-portal-open")?.addEventListener("click", () => {
    window.open(url, "_blank", "noopener,noreferrer");
  });

  portal.querySelector(".o25-portal-return")?.addEventListener("click", () => {
    portal.remove();

    setTimeout(() => {
      window.scrollTo({
        top: Number(state.scrollY) || 0,
        behavior: "instant"
      });
    }, 100);
  });

  portal.querySelector(".o25-portal-close")?.addEventListener("click", () => {
    portal.remove();
  });
}