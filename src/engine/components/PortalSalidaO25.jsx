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
  whatsapp: "/icons/whatsapp.png",
  facebook: "/icons/facebook.png",
  instagram: "/icons/instagram.png",
  tiktok: "/icons/tiktok.png",
  youtube: "/icons/youtube.png",
  web: "/icons/web.png",

  // Alias posibles según el nombre usado por cada Vivo.
  email: "/icons/email.png",
  correo: "/icons/email.png",

  telefono: "/icons/telefono.png",
  tel: "/icons/telefono.png",
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
  const iconoVivo = ICONOS[state?.vivo] || null;

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
  if (iconoVivo) {
    return (
      <main style={styles.locationPage}>
        <section style={styles.locationPanel}>
         <img
  src={iconoVivo}
  alt={nombre}
  style={styles.locationIcon}
  draggable={false}
/>

         <button
  type="button"
  style={styles.yellowButton}
  onClick={abrirDestino}
  aria-label={`Abrir ${nombre}`}
>
  CONTINUAR
</button>

          <button
            type="button"
            style={styles.backButton}
            onClick={volverAlAviso}
          >
            ← Volver al aviso
          </button>
          <p style={styles.helpText}>
  Al terminar, pulse Atrás para volver al aviso del anunciante.
</p>
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

    background: "#F5F6F8",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },

  locationPanel: {
  width: "100%",
  maxWidth: 390,

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  padding: "24px 28px 26px",
  boxSizing: "border-box",

  background: "#FFFFFF",

  borderRadius: 30,

  boxShadow: "0 16px 45px rgba(0,0,0,.12)",
},
locationIcon: {
  width: 90,
  height: 90,

  objectFit: "contain",

  display: "block",

  marginBottom: 32,
},

  yellowButton: {
  width: "100%",
  height: 64,

  border: 0,
  borderRadius: 18,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  cursor: "pointer",

  background: "#FFD21F",

  color: "#1E1E1E",

  fontSize: 22,
  fontWeight: 800,
  letterSpacing: 0.5,

  marginBottom: 18,

  boxShadow: "0 8px 18px rgba(255,210,31,.30)",
},

  

  backButton: {
  width: "100%",
  height: 64,

  border: "1px solid #D8D8D8",
  borderRadius: 18,

  background: "#FFFFFF",

  color: "#2E2E2E",

  cursor: "pointer",

  fontSize: 21,
  fontWeight: 700,

  marginBottom: 26,
},
helpText: {
  marginTop: 8,

  fontSize: 16,

  fontWeight: 500,

  lineHeight: 1.45,

  color: "#555555",

  textAlign: "center",

  maxWidth: 300,
},
};