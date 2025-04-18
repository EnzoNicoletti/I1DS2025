const carregarDados = async () =>{
    // Escondendo e zerando a div-erro
    let divErro = document.getElementById("div-erro");
    divErro.style.display = "none";
    divErro.innerHTML = "";

try {
    const response = await fetch("https://api.coinbase.com/v2/currencies");
    const dados = await response.json() //convertendo a resposta em aquivo JSON
    prepararTabela(dados.data)
    if(!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
} catch (error) {
    divErro.style.display = "block";
    divErro.innerHTML = `<b>Erro ao acessar a API: </b> ${error.message}`;
}
}

const prepararTabela = (dados) => {
    const linhaTabela = document.getElementById("itens");
    linhaTabela.innerHTML = "";

    let contador = 0;

    dados.forEach(moeda => {
        let linhaAuxiliar = contador % 2 !== 0? "<tr class='listra'>" : "<tr>";
        linhaAuxiliar += `<td>${moeda.id}</td> 
        <td>${moeda.name}</td></tr>`;

        contador++;
        linhaTabela.innerHTML += linhaAuxiliar;
    });
}