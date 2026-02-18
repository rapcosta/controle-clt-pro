/* ================================= */
/* AGUARDAR SESSÃO INICIAL SUPABASE */
/* ================================= */

let sessaoCarregada = false

supabaseClient.auth.onAuthStateChange((event, session)=>{

console.log("Auth event:", event)

if(!sessaoCarregada){
sessaoCarregada = true
validarSessao(session)
return
}

if(event === "SIGNED_OUT"){
window.location.href = "login.html"
}

})

/* ================================= */
/* VALIDAR SESSÃO */
/* ================================= */

function validarSessao(session){

if(!session){
window.location.href = "login.html"
return
}

/* mostrar usuário */
const el = document.getElementById("usuarioLogado")
if(el){
el.innerText = "Logado como: " + session.user.email
}

}

/* ================================= */
/* PROTEGER PÁGINA */
/* ================================= */

async function protegerPagina(){

const { data } = await supabaseClient.auth.getSession()

if(!data.session){
window.location.href = "login.html"
}

}

/* ================================= */
/* LOGOUT */
/* ================================= */

async function logout(){
await supabaseClient.auth.signOut()
window.location.href = "login.html"
}
