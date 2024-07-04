const prompt = require ("prompt-sync")()
const fs = require("fs") // fs (file system): pacote que contém
                        // funções para manipulação de arquivos

const name = []
const genero = []
const duracao = []
const avaliacao = []

function inclusao() {
    console.log("\nInclusão de Filme")
    console.log("-".repeat(30))

    const x = prompt("Nome do Filme.....: ")
    const y = prompt("Gênero............: ")
    const z = Number(prompt("Duração (min).....: "))
    const u = Number(prompt("Avaliação (1-5)....: "))

    name.push(x)
    genero.push(y)
    duracao.push(z)
    avaliacao.push(u)

    console.log("Filme catalogado com sucesso!!")
}

function listagem() {
    console.log("\nCatálogo Dos Filmes")
    console.log("-".repeat(60))
    console.log("Nome do Filme".padEnd(20), "Gênero".padEnd(20), "Duração".padEnd(15), "Avaliação".padStart(10))
    console.log("=".repeat(60))

    for (let i = 0; i < name.length; i++) {
        let horas = Math.floor(duracao[i] / 60);
        let minutos = duracao[i] % 60;
        console.log(`${name[i].padEnd(20)} ${genero[i].padEnd(20)} ${horas}:${minutos.toString().padStart(2, '0').padEnd(12)} ${avaliacao[i].toString().padStart(10)}`);
    }
}

function pesquisaPorGenero() {
    const buscaGenero = prompt("Digite o gênero a pesquisar: ");
    console.log(`\nResultados para o gênero "${buscaGenero}":`);
    console.log("-".repeat(60));

    let encontrou = false;
    for (let i = 0; i < genero.length; i++) {
        if (genero[i].toLowerCase() === buscaGenero.toLowerCase()) {
            encontrou = true;
            console.log(`${name[i]} (${genero[i]}), ${duracao[i]} minutos, Avaliação: ${avaliacao[i]}`);
        }
    }

    if (!encontrou) {
        console.log(`Nenhum filme encontrado para o gênero "${buscaGenero}".`);
    }
}

function pesquisaPorAvaliacao() {
    const buscaAvaliacao = Number(prompt("Digite a avaliação (1-5) a pesquisar: "))
    console.log(`\nResultados para a avaliação ${buscaAvaliacao}:`)
    console.log("-".repeat(60))

    let encontrou = false;
    for (let i = 0; i < avaliacao.length; i++) {
        if (avaliacao[i] == buscaAvaliacao) {
            encontrou = true;
            console.log(`${name[i]} (${genero[i]}), ${duracao[i]} minutos, Avaliação: ${avaliacao[i]}`);
        }
    }

    if (!encontrou) {
        console.log(`Nenhum filme encontrado com avaliação ${buscaAvaliacao}.`);
    }
}

function pesquisaPorNome(){
    const buscaNome = prompt("Nome do Filme: ")
    console.log(`\nResultados para a pesquisa ${buscaNome}`)
    console.log("-".repeat(60))

    let encontrou = false;
    for (let i = 0; i < name.length; i++){
        if(name[i] === buscaNome){
            encontrou = true;
            console.log(`${name[i]} (${genero[i]}), ${duracao[i]} minutos, Avaliação: ${avaliacao[i]}`);
        }
    }
    if (!encontrou) {
        console.log(`Nenhum filme encontrado com este nome "${buscaNome}".`);
    }
}

function exclusaoFilme() {
    const nomeFilme = prompt("Digite o nome do filme para excluir: ")
    let filmeExcluido = false
    
    for (let i = 0; i < name.length; i++) {
        if (name[i] === nomeFilme) {
            for (let j = i; j < name.length - 1; j++) {
                name[j] = name[j + 1];
                genero[j] = genero[j + 1];
                duracao[j] = duracao[j + 1];
                avaliacao[j] = avaliacao[j + 1];
            }  
            name.pop();
            genero.pop();
            duracao.pop();
            avaliacao.pop();
            filmeExcluido = true;
            break;
        }
    }
    
    if (filmeExcluido) {
        console.log(`Filme "${nomeFilme}" excluído com sucesso.`)
    } else {
        console.log(`Filme "${nomeFilme}" não encontrado.`)
    }
}

function gravaDados(){
const filmes = []

// atribui o conteúdo dos vetores para um único vetor
for(let i = 0; i < name.length; i++){
    filmes.push(name[i]+";"+genero[i]+";"+duracao[i]+";"+avaliacao[i])
}
// salva o conteúdo do vetor em um arquivo
fs.writeFileSync("filmes.txt", filmes.join("\n"))

console.log("Dados salvos em arquivo...")
}

function carregaDados(){
    
    if(fs.existsSync("filmes.txt")){
        // lÊ o conteúdo do arquivo e já separa em elementos de vetor
        const textt = fs.readFileSync("filmes.txt", "utf-8").split("\n")
    
        for(let i = 0; i < textt.length; i++){
            // separa a linha, em elementos de vetor a partir da ocorrência ";"
            const partes = textt[i].split(";")

            name.push(partes[0])    
            genero.push(partes[1])
            duracao.push(Number(partes[2]))
            avaliacao.push(Number(partes[3]))
    }
}}
// chama a função carregaDados que lê os dados do arquivo e 
// atribui para os vetores
carregaDados()

// -------------------------------------------------- Programa Principal
do {
    console.log("\nDevFlix - Catalogo de Filmes ")
    console.log("=================================================")
    console.log("1. Inclusão de Filmes")
    console.log("2. Lista de Filmes")
    console.log("3. Pesquisa por Gênero")
    console.log("4. Pesquisa por Avaliação")
    console.log("5. Pesquisa por Nome do Filme")
    console.log("6. Exclusão de Filme")
    console.log("7. Finalizar")
    const opcao = Number(prompt("Opção: "))

    if(opcao == 1){
        inclusao()
    }else if(opcao == 2){
        listagem()
    }else if(opcao == 3){
        pesquisaPorGenero()
    }else if(opcao == 4){
        pesquisaPorAvaliacao()
    }else if(opcao == 5){
        pesquisaPorNome()
    }else if(opcao == 6){
        exclusaoFilme()
    }else{
        break
    }
     
    
}while (true)

// no final, chama a função que grava os dados dos vetores em arquivo
gravaDados()