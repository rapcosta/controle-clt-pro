/* =============================== */
/* CONFIGURAÇÃO SUPABASE */
/* =============================== */

const SUPABASE_URL = "https://dopbnyuhvgsjapgttist.supabase.co"
const SUPABASE_KEY = "SUA_CHAVE_AQUI"

/* =============================== */
/* CLIENTE GLOBAL */
/* =============================== */

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

console.log("🔥 Supabase conectado")
