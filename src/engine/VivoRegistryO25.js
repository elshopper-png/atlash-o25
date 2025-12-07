// ============================================================
// 🧬 VivoRegistryO25 — Registro Universal de Vivos OMEGA-25
// ============================================================

import VivoUbicacion from "./components/VivoUbicacion.jsx";
import VivoWhatsapp from "./components/VivoWhatsapp.jsx";
import VivoCarrusel from "./components/VivoCarrusel.jsx";
import VivoVideo from "./components/VivoVideo.jsx";


import VivoFacebook from "./components/VivoFacebook.jsx";
import VivoInstagram from "./components/VivoInstagram.jsx";
import VivoTiktok from "./components/VivoTiktok.jsx";
import VivoWeb from "./components/VivoWeb.jsx";
import VivoEmail from "./components/VivoEmail.jsx";
import VivoYoutube from "./components/VivoYoutube.jsx";


import VivoOferta from "./components/VivoOferta.jsx";
import VivoVolver from "./components/VivoVolver.jsx";

import VivoTelefono from "./components/VivoTelefono.jsx";

export const VIVO_REGISTRY = {
  ubicacion: VivoUbicacion,

  // 🔹 WhatsApps (uno o varios)
  whatsapp: VivoWhatsapp,   // modelo antiguo (Saúl, Burga, etc.)
  whatsapp1: VivoWhatsapp,  // Caserito, otros nuevos
  whatsapp2: VivoWhatsapp,

  // 🔹 Teléfonos fijos
  telefono1: VivoTelefono,
  telefono2: VivoTelefono,

  carrusel: VivoCarrusel,
  video: VivoVideo,


  facebook: VivoFacebook,
  instagram: VivoInstagram,
  youtube: VivoYoutube,

  tiktok: VivoTiktok,
  web: VivoWeb,
  email: VivoEmail,

  oferta: VivoOferta,
  volver: VivoVolver,
};
