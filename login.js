/* ========================= */
/* HASH */
/* ========================= */
function hash(texto){
return btoa(texto)
}

/* ========================= */
/* CRIAR ADMIN PADRÃO */
/* ========================= */
if(!localStorage.getItem("usuarios")){

const usuariosPadrao = [
{
nome:"admin",
senha: hash("123"),
unidade:"Sabará",
primeiroAcesso:true
}
]

localStorage.setItem("usuarios", JSON.stringify(usuariosPadrao))
}

/* ========================= */
/* LOGIN */
/* ========================= */
function login(event){

event.preventDefault()

const usuario=document.getElementById("usuario").value
const senha=document.getElementById("senha").value

const usuarios=JSON.parse(localStorage.getItem("usuarios"))||[]

const encontrado=usuarios.find(u =>
u.nome===usuario && u.senha===hash(senha)
)

if(!encontrado){
document.getElementById("erro").innerText="Login inválido"
return
}

/* ========================= */
/* SALVAR SESSÃO COMPLETA */
/* ========================= */

localStorage.setItem("logado","sim")

/* salva objeto inteiro do usuário */
localStorage.setItem("usuarioLogado", JSON.stringify(encontrado))

/* verificar primeiro acesso */
if(encontrado.primeiroAcesso){
window.location="trocar_senha.html"
}else{
window.location="dashboard.html"
}

}
