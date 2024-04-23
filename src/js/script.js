
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
 function constroiCard(id,nome, preco, imagem) {

    const containerCards = document.querySelector("[data-card]");

            const card = document.createElement("li");
            card.classList.add("container__produtos__meus-produtos-item");

            const img = document.createElement("img");
            img.classList.add("imagem__jogo");
            img.src = imagem;
            img.alt = `imagem do game ${nome}`;
            const h3 = document.createElement('h3');
            h3.textContent = nome.toUpperCase();

            const itemValor = document.createElement('div')
            itemValor.classList.add('meus-produtos-item-valor-icone')
            
            const valor = document.createElement('p')
            valor.textContent = `${preco} R$`

            const imgLixeira = document.createElement('img')
            imgLixeira.classList.add('imagem__lixeira')
            imgLixeira.src = "/src/img/lixeira.png"
            imgLixeira.alt = "imagem da lixeira"
            imgLixeira.addEventListener('click',() => deletarCard(id))

            containerCards.appendChild(card)
            card.append(img,h3,itemValor)
            itemValor.append(valor,imgLixeira)
           
    return card;
}

//metodo para listar os games
async function listaGames() {
    const card = document.querySelector("[data-card]")
    try {
        const listaApi = await buscarGames();
        listaApi.forEach(elemento => card.appendChild(
        constroiCard(elemento.id, elemento.nome, elemento.preco, elemento.imagem)
        ))
        


    } catch (error) {
        card.innerHTML = `
        <h2 class="menssagem__titulo">Não foi possivel carregar os Games </h2> `
        console.log(`Error capturado : ${error}`)
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
        location.reload() //atualiza a pagina

    } catch (error) {
        alert(error)
    }
    

}


const formulario = document.querySelector('[data-formulario]');
formulario.addEventListener('submit' , evento => criarGame(evento));


async function deletarCard(id){
    const conexao = await fetch(`http://localhost:3000/games/${id}` , {
        method:'DELETE'})
        if(conexao.ok){
            console.log('apagado com sucesso')
        }else{
            console.log('falha ao apagar')
        }
        location.reload()

    }


