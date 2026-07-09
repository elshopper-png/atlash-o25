import React, { useEffect, useMemo, useState } from "react";

const NOMBRES = {
  whatsapp: "WhatsApp",
  ubicacion: "Ubicación",
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  web: "Web",
  externo: "enlace externo",
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
    const destino = state?.pathname || "/saul-garrido";
    window.location.href = destino;
  };

  const abrirDestino = () => {
    if (!state?.destino) return;
    window.location.href = state.destino;
  };

  if (!state) {
    return (
      <main style={styles.page}>
        <section style={styles.card}>
          <div style={styles.badge}>Shopper Digital</div>
          <h1 style={styles.title}>No encontramos el aviso</h1>
          <p style={styles.text}>Regresa al inicio para continuar navegando.</p>
          <button
            style={styles.secondary}
            onClick={() => (window.location.href = "/")}
          >
            Ir al inicio
          </button>
        </section>
      </main>
    );
  }

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
};