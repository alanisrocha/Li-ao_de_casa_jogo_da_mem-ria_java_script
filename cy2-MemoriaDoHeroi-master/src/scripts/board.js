// Classe para gerenciar as ações do tabuleiro
class BoardManager{
    // Atributos

    // Dependências
    cardManager; // Objeto para manipular os cartões dentro do tabuleiro

    // Elementos do DOM
    node; // O elemento DOM que representa o tabuleiro

    // Número
    numImgs; // Número de imagens diferentes na biblioteca
    curNumCards; // Número atual de cartas no tabuleiro

    // Construtor
    constructor(id, numImgs, cardManager){
        // Obtém o nó do tabuleiro usando o ID recebido
        this.node = document.getElementById(id);

        // Define os demais atributos
        this.numImgs = numImgs;
        this.cardManager = cardManager;
    }

    // Limpa o tabuleiro removendo todas as cartas
    clear(){
        this.node.innerHTML = "";
    }

    // Adiciona o número recebido de cartas ao tabuleiro
    fill(numberCards){
        // Verifica se não há imagens suficientes
        if(numberCards>2*this.numImgs){
            // Exibe mensagem de erro
            console.error(`Erro: Não há imagens suficientes para ${numberCards} cartas.`);
            // Ajusta o número de cartas e continua o jogo
            numberCards = 2*this.numImgs;
        }
        // numberCards deve ser um inteiro
        numberCards=parseInt(numberCards);
        // Define curNumCards
        this.curNumCards = numberCards;
        
        this.clear(); // Reinicia o tabuleiro
        this.genRamdonList(numberCards).forEach((number)=>{
             // Coloca uma carta no tabuleiro com base no número da carta
            this.addCard(this.cardManager.gen(number));
        })

        this.adjustCss();
    }

    // Ajusta o CSS para encaixar todas as cartas no tabuleiro
    adjustCss(){
        // Calcula o número de colunas
        let cols = Math.sqrt(this.curNumCards);
        // Calcula o tamanho da carta
        let size = (100/cols - 1);
        // Converte o tamanho em uma string CSS
        size+='vmin';

        // Define as propriedades CSS
        document.documentElement.style.setProperty("--numCols", cols);
        document.documentElement.style.setProperty("--size", size); 
    }


    // Adiciona uma carta ao tabuleiro
    addCard(card){
        this.node.appendChild(card); // Anexa a carta ao tabuleiro
    }

    // Gera uma lista aleatória
    genRamdonList(size){
        // Cria uma lista com os números de 1 até size
        let list = Array(size/2).fill().map((_,i)=>i+1);
        // Duplica essa lista e embaralha
        list = [...list,...list].sort(()=>Math.random()-0.5);
        return list;
    }

    // Verifica se todas as cartas foram encontradas
    check(){
        // Obtém todas as cartas encontradas
        let flipped = document.getElementsByClassName('matched');
        // Retorna se for igual ao número esperado de cartas
        return flipped.length >= this.curNumCards;
    }
}
