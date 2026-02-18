if(localStorage.getItem("logado")!=="sim"){
window.location="login.html"
}

let funcionario={}

function salvarFuncionario(){

funcionario.nome=document.getElementById("nome").value
funcionario.cargo=document.getElementById("cargo").value
funcionario.setor=document.getElementById("setor").value
funcionario.salario=parseFloat(document.getElementById("salario").value)

localStorage.setItem("funcionario",JSON.stringify(funcionario))

alert("Salvo com sucesso")
}

function gerarContracheque(){

funcionario=JSON.parse(localStorage.getItem("funcionario"))

if(!funcionario){
alert("Cadastre primeiro")
return
}

let inss=funcionario.salario*0.08
let liquido=funcionario.salario-inss

let html=`

<h2>FACILITE SERVIÇOS & TERCEIRIZAÇÃO LTDA</h2>
<p>CNPJ: 52.642.823/0001-14</p>

<hr>

<p><b>Funcionário:</b> ${funcionario.nome}</p>
<p><b>Cargo:</b> ${funcionario.cargo}</p>
<p><b>Setor:</b> ${funcionario.setor}</p>

<hr>

<div class="linha">
<span>Salário Base</span>
<span>R$ ${funcionario.salario.toFixed(2)}</span>
</div>

<div class="linha">
<span>INSS</span>
<span>R$ ${inss.toFixed(2)}</span>
</div>

<hr>

<div class="linha total">
<span>Valor Líquido</span>
<span>R$ ${liquido.toFixed(2)}</span>
</div>

<br><br>
_____________________________<br>
Assinatura do Funcionário

<br><br>
<button onclick="window.print()">Imprimir</button>

`

document.getElementById("contracheque").innerHTML=html
document.getElementById("contracheque").classList.remove("hidden")
}

function logout(){
localStorage.removeItem("logado")
window.location="login.html"
}
