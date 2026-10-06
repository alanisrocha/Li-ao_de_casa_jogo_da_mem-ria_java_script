// Variáveis

// Fábrica
function urlBuilder(number){
    // Converte o número em string
    number+="";
    // Adiciona 0 à esquerda para números pequenos
    number = number.padStart(2,'0');

    return `images/heros/card${number}.jpeg`;
}

// Instâncias de objetos
let card = new CardManager(urlBuilder);
let board = new BoardManager("board", 50, card);

// Elementos do DOM
let menu = document.getElementById('menu');
let select = document.getElementById('numCards');
let start = document.getElementById('start');

// Configurando o menu
for (let i = 4; i <= 10; i+=2) {//De 4 a 10
    let n = i*i;//Obtém i²
    // Cria uma nova opção para o select
    let op = document.createElement('option');

    // Define tanto o valor quanto o conteúdo como i²
    op.value=n;
    op.innerHTML=n;

    // Adiciona a nova opção à página
    select.appendChild(op);
}

// Observadores de eventos
start.addEventListener('click', ()=>{
    menu.classList.add('hidden');
    board.node.classList.remove('hidden');
    board.fill(select.value);
});

board.node.addEventListener('click',()=>{
   if(board.check()){
    setTimeout(() => {
        menu.classList.remove('hidden');
        board.node.classList.add('hidden');
    }, 2000);
   } 
})