// Classe para gerenciar a criação e as ações das cartas
class CardManager {
    // Atributos
    flippedCards = new Set();
    urlFactory;

    // Construtor
    constructor(factory) {
        this.urlFactory = factory;
    }

    // Gera uma nova carta com base no número do herói
    gen(heroNumber) {
        // Obtém a referência ao template e clona seu conteúdo
        let template = document.getElementById("cardTemplate");
        let clone = template.content.cloneNode(true);

        // Obtém a referência ao elemento de imagem
        let img = clone.querySelector('img');

        // Altera a origem da imagem
        img.setAttribute('src', this.urlFactory(heroNumber));

        // Trata os cliques na carta
        clone.children[0].addEventListener('click',
            event => this.onClick(event)
        );
        
        return clone; // Retorna o clone modificado
    }

    // Trata os eventos de clique
    onClick(event) {
        if(this.flippedCards.size >= 2 ){
            this.endTurn();
        }else{
            this.flip(event.target);
        }
    }

    // Altera o estado da carta

    // Vira a carta recebida
    flip(cardNode) {
        cardNode.children[0].classList.add('selected');
        // Adiciona a carta ao conjunto para verificar mais tarde
        this.flippedCards.add(cardNode);
    }

    // Desvira a carta recebida
    unFlip(cardNode) {
        cardNode.children[0].classList.remove('selected');
    }

    // Define a carta recebida como correspondente
    disable(cardNode) {
        cardNode.children[0].classList.add('matched');
        this.unFlip(cardNode);
    }

    // Métodos de turno
    
    // Verifica se é uma combinação
    check(){
        // Converte o conjunto em um array e mapeia
        let urls = [...this.flippedCards].map((card)=>{
            // Retorna o src da imagem
            return card.querySelector('img').src;
        })
        // Retorna verdadeiro apenas se as URLs forem iguais
        return urls[0] == urls[1];
    }
    
    // Finaliza um turno
    endTurn(){
        // Escolhe a função para finalizar o turno
        // Se for uma combinação, desabilita as cartas
        // caso contrário, desvira as cartas
        let handler = this.check() ? (card)=>this.disable(card): this.unFlip;
        // Executa o manipulador nas duas cartas viradas
        this.flippedCards.forEach(handler);
        // Esvazia o conjunto
        this.flippedCards.clear();
    }

}