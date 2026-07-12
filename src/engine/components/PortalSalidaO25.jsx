import React, { useEffect, useMemo, useState } from "react";

const NOMBRES = {
  whatsapp: "WhatsApp",
  ubicacion: "Ubicación",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  web: "Web",
  correo: "Correo",
  telefono: "Teléfono",
  externo: "enlace externo",
};

const ICONOS = {
  ubicacion: "/icons/ubicacion.png",
};

export default function PortalSalidaO25() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const raw =
      sessionStorage.getItem("O25_RETURN_STATE") ||
      localStorage.getItem("O25_RETURN_STATE");

    if (!raw) return;

    try {
      setState(JSON.parse(raw));
    } catch (err) {
      console.warn("No se pudo leer O25_RETURN_STATE", err);
    }
  }, []);

  const nombre = useMemo(() => {
    return NOMBRES[state?.vivo] || NOMBRES.externo;
  }, [state]);

  const volverAlAviso = () => {
    const destino = state?.pathname || "/";
    window.location.href = destino;
  };

  const abrirDestino = () => {
    if (!state?.destino) return;

    window.open(state.destino);
  };

  if (!state) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <div style={styles.badge}>Shopper Digital</div>

          <h1 style={styles.title}>No encontramos el aviso</h1>

          <p style={styles.text}>
            Regresa al inicio para continuar navegando.
          </p>

          <button
            style={styles.secondary}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Ir al inicio
          </button>
        </section>
      </main>
    );
  }

  /*
   * PROTOTIPO EXCLUSIVO PARA UBICACIÓN
   */
  if (state.vivo === "ubicacion") {
    return (
      <main style={styles.locationPage}>
        <section style={styles.locationPanel}>
          <img
            src={ICONOS.ubicacion}
            alt="Ubicación"
            style={styles.locationIcon}
            draggable={false}
          />

          <button
            type="button"
            style={styles.yellowButton}
            onClick={abrirDestino}
            aria-label="Abrir ubicación"
          >
            <span style={styles.yellowButtonArrow}>›</span>
          </button>

          <button
            type="button"
            style={styles.backButton}
            onClick={volverAlAviso}
          >
            ← Volver al aviso
          </button>
        </section>
      </main>
    );
  }

  /*
   * PORTAL ANTERIOR PARA LOS DEMÁS VIVOS
   * No se modifica todavía.
   */
  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.badge}>Shopper Digital</div>

        <h1 style={styles.title}>Está saliendo hacia {nombre}</h1>

        <p style={styles.text}>
          Cuando termine de navegar, vuelva a esta pantalla y toque el botón
          para regresar directamente al aviso del anunciante.
        </p>

        <button style={styles.primary} onClick={abrirDestino}>
          Abrir {nombre}
        </button>

        <button style={styles.secondary} onClick={volverAlAviso}>
          ← Volver al aviso
        </button>
      </section>
    </main>
  );
}

const styles = {
  /*
   * ESTILO ANTERIOR
   */
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #151515, #050505)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 22,
    boxSizing: "border-box",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 390,
    background: "#111",
    color: "#fff",
    borderRadius: 26,
    padding: "30px 24px 24px",
    textAlign: "center",
    boxShadow: "0 18px 55px rgba(0,0,0,.45)",
  },

  badge: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 12,
    letterSpacing: 0.4,
  },

  title: {
    fontSize: 25,
    lineHeight: 1.15,
    margin: "0 0 14px",
  },

  text: {
    fontSize: 15.5,
    lineHeight: 1.45,
    opacity: 0.82,
    margin: "0 0 24px",
  },

  primary: {
    width: "100%",
    border: 0,
    borderRadius: 999,
    padding: "15px 18px",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    background: "#fff",
    color: "#111",
    marginBottom: 12,
  },

  secondary: {
    width: "100%",
    border: 0,
    borderRadius: 999,
    padding: "15px 18px",
    fontSize: 16,
    cursor: "pointer",
    background: "rgba(255,255,255,.13)",
    color: "#fff",
  },

  /*
   * NUEVO PROTOTIPO: UBICACIÓN
   */
  locationPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    boxSizing: "border-box",
    overflow: "hidden",

    background:
      "radial-gradient(circle at 50% 35%, rgba(72,72,72,.72), rgba(3,3,3,.94) 72%)",

    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },

  locationPanel: {
    width: "100%",
    maxWidth: 350,
    minHeight: 390,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    padding: "38px 26px 28px",
    boxSizing: "border-box",

    background: "rgba(15,15,15,.56)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 32,

    boxShadow:
      "0 28px 75px rgba(0,0,0,.62), inset 0 1px 0 rgba(255,255,255,.08)",

    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  },

  locationIcon: {
    width: 104,
    height: 104,
    objectFit: "contain",
    display: "block",
    marginBottom: 42,

    filter: "drop-shadow(0 14px 22px rgba(0,0,0,.42))",
  },

  yellowButton: {
    width: 112,
    height: 72,

    border: "1px solid rgba(255,255,255,.34)",
    borderRadius: 999,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",

    background:
      "linear-gradient(180deg, #ffe96b 0%, #ffd31f 52%, #f2b900 100%)",

    boxShadow:
      "0 14px 34px rgba(255,202,0,.35), inset 0 2px 2px rgba(255,255,255,.75)",

    color: "#171300",
    marginBottom: 35,
  },

  yellowButtonArrow: {
    display: "block",
    fontSize: 58,
    fontWeight: 300,
    lineHeight: 0.7,
    transform: "translateX(2px) translateY(-2px)",
  },

  backButton: {
    border: 0,
    padding: "11px 16px",

    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",

    background: "transparent",
    color: "rgba(255,255,255,.82)",

    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.1,
  },
};