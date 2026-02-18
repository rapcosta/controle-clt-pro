/* ========================= */
/* CRIPTOGRAFIA */
/* ========================= */
function hash(texto){
return btoa(texto)
}

/* ========================= */
/* UNIDADES VÁLIDAS */
/* ========================= */
const unidadesValidas = [
"Sabará",
"Ocidental",
"Águas Lindas",
"Cruzeiro da Fortaleza",
"Guimarânia"
]

/* ========================= */
/* CRIAR BANCO SE NÃO EXISTIR */
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
/* LISTAR USUÁRIOS */
/* ========================= */
function listar(){

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
let html=""

usuarios.forEach((u,index)=>{

html+=`
<div style="background:#1f1f1f;padding:12px;margin-bottom:10px;border-radius:6px;">
<b>${u.nome}</b> — Unidade: ${u.unidade}

<br><br>

<button onclick="editar(${index})">Editar</button>
<button onclick="excluir(${index})">Excluir</button>
</div>
`
})

document.getElementById("listaUsuarios").innerHTML=html
}

/* ========================= */
/* CADASTRAR */
/* ========================= */
function cadastrar(){

const nome=document.getElementById("novoNome").value.trim()
const senha=document.getElementById("novaSenha").value.trim()
const unidade=document.getElementById("unidadeUsuario").value

if(!nome || !senha || !unidade){
alert("Preencha todos os campos")
return
}

if(!unidadesValidas.includes(unidade)){
alert("Unidade inválida")
return
}

let usuarios=JSON.parse(localStorage.getItem("usuarios")) || []

if(usuarios.find(u=>u.nome===nome)){
alert("Usuário já existe")
return
}

usuarios.push({
nome,
senha:hash(senha),
unidade,
primeiroAcesso:true
})

localStorage.setItem("usuarios", JSON.stringify(usuarios))

document.getElementById("novoNome").value=""
document.getElementById("novaSenha").value=""
document.getElementById("unidadeUsuario").value=""

listar()
alert("Usuário criado com sucesso")
}

/* ========================= */
/* EXCLUIR */
/* ========================= */
function excluir(i){

let usuarios=JSON.parse(localStorage.getItem("usuarios"))
const usuarioLogado=localStorage.getItem("usuarioLogado")

if(usuarios[i].nome==="admin"){
alert("Admin principal não pode ser removido")
return
}

if(usuarios[i].nome===usuarioLogado){
alert("Você não pode excluir o usuário logado")
return
}

if(confirm("Excluir usuário?")){
usuarios.splice(i,1)
localStorage.setItem("usuarios", JSON.stringify(usuarios))
listar()
}
}

/* ========================= */
/* EDITAR */
/* ========================= */
function editar(i){

let usuarios=JSON.parse(localStorage.getItem("usuarios"))

const novaSenha=prompt("Nova senha (deixe vazio para manter):")
const novaUnidade=prompt("Unidade (Sabará / Ocidental / Águas Lindas / Cruzeiro da Fortaleza / Guimarânia):")

if(novaSenha){
usuarios[i].senha=hash(novaSenha)
usuarios[i].primeiroAcesso=false
}

if(novaUnidade){
if(!unidadesValidas.includes(novaUnidade)){
alert("Unidade inválida")
return
}
usuarios[i].unidade=novaUnidade
}

localStorage.setItem("usuarios", JSON.stringify(usuarios))
listar()
}

/* ========================= */
listar()
