
//metodo para buscar os games
async function buscarGames(){
        const apiGames = await fetch('http://localhost:3000/games')
        const apiGamesConvertido = await apiGames.json()
        return apiGamesConvertido;
}


//metodo post para enviar os dados do game
async function criarPost(nome,preco,imagem){
    const conexao = await fetch('http://localhost:3000/games' , {

        method:'POST',

        headers:{
            'Content-type': 'application/json'
        },

        body: JSON.stringify({
            nome: nome,
            preco: preco,
            imagem:imagem
        })
    });

    if(!conexao.ok) {
        throw new Error("Não foi cadastrar enviar o game");
    }

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

//--------------------------------------------------------------------------------------------------------------

//metodo para contruir o card com as informações
 function constroiCard(nome, preco, imagem) {

    const card = document.querySelector("[data-card]")
            card.innerHTML += `
            <li class="container__produtos__meus-produtos-item" >
            <img src="${imagem}" alt="imagem do jogo kratos" class="imagem__jogo">
            <h3>${nome}</h3>
        
            <div class="meus-produtos-item-valor-icone">
                <p>${preco}$</p>
                <img src="/src/img/lixeira.png" alt="imagem da lixeira" class="imagem__lixeira">
            </div>
            </li>
            `
    return card;
}

//metodo para listar os games
async function listaGames() {
    const card = document.querySelector("[data-card]")
    try {
        const listaApi = await buscarGames();
        listaApi.forEach(elemento => 
        constroiCard(elemento.nome, elemento.preco, elemento.imagem))
    } catch (error) {
        card.innerHTML = `
        <h2 class="menssagem__titulo">Não foi possivel carregar os Games </h2>
        Error capturado : ${error}
        `
    }
    
}

listaGames();



//pegar os dados e envia para criar o game
async function criarGame(evento){
    evento.preventDefault();
    const nome = document.querySelector('[data-nome]').value;
    const preco = document.querySelector('[data-preco]').value;
    const imagem = document.querySelector('[data-imagem]').value;

    try {
        await criarPost(nome, preco, imagem)
        alert('Game cadastrado com sucesso')

    } catch (error) {
        alert(error)
    }

}

const formulario = document.querySelector('[data-formulario]');
formulario.addEventListener('submit' , evento => criarGame(evento));



