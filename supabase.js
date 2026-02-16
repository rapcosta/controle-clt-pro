const SUPABASE_URL = "https://dopbnyuhvgsjapgttist.supabase.co"
const SUPABASE_KEY = "SUA_CHAVE_PUBLICA_AQUI"

/* cria cliente */
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

/* deixa global */
window.supabaseClient = supabaseClient

console.log("🔥 Supabase conectado")
