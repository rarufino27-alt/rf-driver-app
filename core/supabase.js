/* =========================================================
   SUPABASE CONFIG GLOBAL — RF DRIVER
   Arquivo: core/supabase.js
   ========================================================= */

/* ================= CDN CHECK ================= */
if (typeof supabase === "undefined") {
  throw new Error("Supabase CDN não carregado. Verifique a ordem dos scripts.");
}

/* ================= CONFIG FIXA ================= */

// URL do projeto Supabase
const SUPABASE_URL = "https://msnqiiwcityikslikbow.supabase.co";

// ANON KEY (pública, segura para frontend)
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zbnFpaXdjaXR5aWtzbGlrYm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MDM5OTgsImV4cCI6MjA4MzI3OTk5OH0.0KyaSuL5At4_Cfa4TOM7kvvkVYv-gmR2sb7vX6VHkaU";

// GRUPO FIXO — RF Driver
const GRUPO_ID_FIXO = "155c396c-0dec-4db8-ad61-cb680b4f00d7";

/* ================= CLIENTE ================= */

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

/* ================= HELPERS GLOBAIS ================= */

// Retorna grupo atual (fixo por enquanto)
function getGrupoId() {
  return GRUPO_ID_FIXO;
}

// Retorna usuário logado
function getUsuarioLogado() {
  try {
    return JSON.parse(localStorage.getItem("usuarioRF"));
  } catch {
    return null;
  }
}

// Salva usuário na sessão
function setUsuarioLogado(usuario) {
  localStorage.setItem("usuarioRF", JSON.stringify(usuario));
}

// Remove sessão
function logoutUsuario() {
  localStorage.removeItem("usuarioRF");

}
