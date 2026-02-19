// =============================
// PEGAR UID DA URL
// =============================
const params = new URLSearchParams(window.location.search)
const uid = params.get("uid")
const mes = params.get("mes")
const ano = params.get("ano")

if(!uid){
    alert("Funcionário não informado")
    history.back()
}

// =============================
// FORMATAR DINHEIRO
// =============================
function moeda(v){
    return Number(v).toFixed(2)
}

// =============================
// CALCULO INSS 2024/2025 (progressivo real)
// =============================
function calcularINSS(salario){

    let total = 0

    const faixas = [
        {limite:1412, aliquota:0.075},
        {limite:2666.68, aliquota:0.09},
        {limite:4000.03, aliquota:0.12},
        {limite:7786.02, aliquota:0.14}
    ]

    let restante = salario
    let anterior = 0

    for(const f of faixas){

        if(restante <= 0) break

        const base = Math.min(f.limite - anterior, restante)
        total += base * f.aliquota

        restante -= base
        anterior = f.limite
    }

    return total
}

// =============================
// CALCULO IRRF
// =============================
function calcularIRRF(base, dependentes){

    const deducaoDependente = 189.59
    base -= dependentes * deducaoDependente

    if(base <= 2259.20) return 0
    if(base <= 2826.65) return base*0.075 - 169.44
    if(base <= 3751.05) return base*0.15 - 381.44
    if(base <= 4664.68) return base*0.225 - 662.77

    return base*0.275 - 896
}

// =============================
// CARREGAR FUNCIONARIO
// =============================
async function carregar(){

    const {data, error} = await supabaseClient
        .from("funcionarios")
        .select("*")
        .eq("uid", uid)
        .single()

    if(error){
        alert("Erro ao carregar funcionário")
        console.log(error)
        return
    }

    montarFolha(data)
}

// =============================
// MONTAR FOLHA COMPLETA
// =============================
function montarFolha(f){

    const salario = Number(f.salario || 0)
    const dependentes = Number(f.dependentes || 0)
    const faltas = Number(f.faltas || 0)

    // =========================
    // DESCONTO FALTAS
    // =========================
    const valorDia = salario / 30
    const descontoFaltas = valorDia * faltas

    // =========================
    // INSS
    // =========================
    const inss = calcularINSS(salario)

    // =========================
    // BASE IR
    // =========================
    const baseIR = salario - inss - descontoFaltas

    // =========================
    // IRRF
    // =========================
    const irrf = calcularIRRF(baseIR, dependentes)

    // =========================
    // FGTS (não desconta)
    // =========================
    const fgts = salario * 0.08

    // =========================
    // TOTAIS
    // =========================
    const totalDescontos = inss + irrf + descontoFaltas
    const liquido = salario - totalDescontos

    // =========================
    // PREENCHER DADOS
    // =========================
    preencherTexto("mesAno1", `${mes}/${ano}`)
    preencherTexto("mesAno2", `${mes}/${ano}`)

    preencherTexto("nome1", f.nome)
    preencherTexto("nome2", f.nome)

    preencherTexto("cpf1", f.cpf)
    preencherTexto("cpf2", f.cpf)

    preencherTexto("cargo1", f.cargo)
    preencherTexto("cargo2", f.cargo)

    preencherTexto("unidade1", f.unidade)
    preencherTexto("unidade2", f.unidade)

    preencherTexto("salario1", moeda(salario))
    preencherTexto("salario2", moeda(salario))

    preencherTexto("dep1", dependentes)
    preencherTexto("dep2", dependentes)

    preencherTexto("totalVenc1", moeda(salario))
    preencherTexto("totalVenc2", moeda(salario))

    preencherTexto("totalDesc1", moeda(totalDescontos))
    preencherTexto("totalDesc2", moeda(totalDescontos))

    preencherTexto("baseINSS1", moeda(salario))
    preencherTexto("baseINSS2", moeda(salario))

    preencherTexto("baseFGTS1", moeda(salario))
    preencherTexto("baseFGTS2", moeda(salario))

    preencherTexto("liquido1", moeda(liquido))
    preencherTexto("liquido2", moeda(liquido))

    // =========================
    // EVENTOS
    // =========================
    const eventos = [
        ["001","Salário Base","30", moeda(salario),""],
        ["100","INSS","", "", moeda(inss)],
        ["200","IRRF","", "", moeda(irrf)],
        ["300","Faltas", faltas, "", moeda(descontoFaltas)]
    ]

    preencherTabela("tabelaEventos1", eventos)
    preencherTabela("tabelaEventos2", eventos)
}

// =============================
// HELPERS
// =============================
function preencherTexto(id, valor){
    document.getElementById(id).innerText = valor || ""
}

function preencherTabela(id, eventos){

    const tbody = document.getElementById(id)
    tbody.innerHTML = ""

    eventos.forEach(e=>{
        tbody.innerHTML += `
        <tr>
            <td>${e[0]}</td>
            <td>${e[1]}</td>
            <td>${e[2]}</td>
            <td>${e[3]}</td>
            <td>${e[4]}</td>
        </tr>`
    })
}

carregar()

setTimeout(()=>{
    window.print()
}, 1000)

