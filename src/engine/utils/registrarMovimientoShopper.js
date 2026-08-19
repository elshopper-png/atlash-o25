// ============================================================
// registrarMovimientoShopper.js
// Registro mínimo de actividad para Shopper Insight
// ============================================================

const SUPABASE_URL =
  "https://qaslnhtzmquqcuktdkdd.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_n0zbjKrmY2bTtKFW_TsPzw_k6AGz9-N";

/**
 * Registra una actividad en shop_movimientos.
 * Incluye una protección breve contra registros duplicados
 * causados por recargas inmediatas o React StrictMode.
 *
 * Devuelve:
 * - true: registro exitoso o duplicado omitido.
 * - false: datos incompletos o fallo real del envío.
 */
export async function registrarMovimientoShopper(
  anunciante,
  canal,
  claveUnica = ""
) {
  if (!anunciante || !canal) {
    console.warn(
      "⚠️ Movimiento no registrado por datos incompletos:",
      {
        anunciante,
        canal,
      }
    );

    return false;
  }

  const clave =
    claveUnica ||
    `${anunciante}-${canal}`
      .toLowerCase()
      .replace(/\s+/g, "-");

  const storageKey =
    `SHOPPER_MOVIMIENTO_${clave}`;

  const ahora = Date.now();

  const ultimoRegistro = Number(
    sessionStorage.getItem(storageKey) || 0
  );

  /*
 * Flyer: una sola vez por sesión.
 * Otros canales: evita duplicados accidentales
 * durante 5 segundos.
 */
if (clave.startsWith("flyer-")) {
  if (ultimoRegistro > 0) {
    console.log(
      "ℹ️ Flyer ya registrado en esta sesión:",
      anunciante
    );

    return true;
  }
} else if (ahora - ultimoRegistro < 5000) {
  console.log(
    "ℹ️ Movimiento duplicado omitido:",
    anunciante,
    canal
  );

  return true;
}

  sessionStorage.setItem(
    storageKey,
    String(ahora)
  );

  try {
    const respuesta = await fetch(
      `${SUPABASE_URL}/rest/v1/shop_movimientos`,
      {
        method: "POST",

        /*
         * Permite completar el envío aunque
         * inmediatamente se abra una app externa.
         */
        keepalive: true,

        headers: {
          apikey: SUPABASE_KEY,
          Authorization:
            `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },

        body: JSON.stringify({
          anunciante,
          canal,
        }),
      }
    );

    if (!respuesta.ok) {
      const detalle =
        await respuesta.text();

      throw new Error(
        `Supabase respondió ${respuesta.status}: ${detalle}`
      );
    }

    console.log(
      `✅ Shopper Insight registró: ${anunciante} → ${canal}`
    );

    return true;
  } catch (error) {
    /*
     * Permite volver a intentar si realmente
     * falló el registro.
     */
    sessionStorage.removeItem(storageKey);

    console.error(
      "❌ No se pudo registrar el movimiento:",
      error
    );

    return false;
  }
}