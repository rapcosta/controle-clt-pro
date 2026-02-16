const SUPABASE_URL = "https://dopbnyuhvgsjapgttist.supabase.co"
const SUPABASE_KEY = "SUA_CHAVE_PUBLICA_AQUI"

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
)

window.supabaseClient = supabase

console.log("🔥 Supabase conectado")
