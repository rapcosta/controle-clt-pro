const SUPABASE_URL = "https://dopbnyuhvgsjapgttist.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcGJueXVodmdzamFwZ3R0aXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExOTk5NTAsImV4cCI6MjA4Njc3NTk1MH0.Es5uUU4vhFtADeB9PXapqAMJqI8N18iOJw6-12q1Pbw"

const supabase = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
)
