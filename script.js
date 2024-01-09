const html = document.querySelector('html'); //pegando todos os elementos html
const focoBt = document.querySelector('.app__card-button--foco'); //buscando o elemento no documento html pela classe .app__card-button--foco
const curtoBt = document.querySelector('.app__card-button--curto'); //buscando o elemento no documento html pela classe .app__card-button--curto
const longoBt = document.querySelector('.app__card-button--longo'); //buscando o elemento no documento html pela classe .app__card-button--longo
const banner = document.querySelector('.app__image'); //buscando o elemento no documento html pela classe .app__image 
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio ('/sons/luna-rise-part-one.mp3'); //instanciando as musicas nas variaveis
const audioPlay = new Audio ('/sons/play.wav'); //instanciando as musicas nas variaveis
const audioPausa = new Audio ('/sons/pause.mp3'); //instanciando as musicas nas variaveis
const audioTempoFinalizado = new Audio ('./sons/beep.mp3'); //instanciando as musicas nas variaveis

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musica.loop = true; //musica ficar tocando em looping

musicaFocoInput.addEventListener('change', () => { // adicionando o método addEventLister com o evento change, costumado a usar para trabalhar com inputs do tipo checkboxes, com true ou false para alterar. Com uma função anonima (callback) para dizer o que quer que aconteça a partir do clique
    if(musica.paused) { //condição if, se musica estiver com a propriedade paused, irá tocar a musica
        musica.play();
    } else {
        musica.pause(); //se não, a musica será pausada 
    }
})

focoBt.addEventListener('click', () => { //adicionando o método addEventListener com o evento click, com o callback (function) aqui no caso, usando arrow function
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco'); // passando a variável com os eventos, e o valor está 'foco' está sendo passado por parâmetro. Note que 'foco é o mesmo valor do atributo e o nome da imagem
    focoBt.classList.add('active'); //adicionando a class, que foi pega pelo foboBt, o active

});

curtoBt.addEventListener('click', () => { //adicionando o método addEventListener com o evento click, com o callback (function) aqui no caso, usando arrow function
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto'); // passando a variável com os eventos, e o valor está 'descanso-curto' está sendo passado por parâmetro. Note que 'descanso-curto é o mesmo valor do atributo e o nome da imagem
    curtoBt.classList.add('active'); //adicionando a class, que foi pega pelo curtoBt, o active
});

longoBt.addEventListener('click', () => { //adicionando o métodp addEventListener com o evento click, com o callback (function) aqui no caso, usando arrow function
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo'); // passando a variável com os eventos, e o valor está 'descanso-longo' está sendo passado por parâmetro. Note que 'descanso-longo é o mesmo valor do atributo e o nome da imagem 
    longoBt.classList.add('active'); //adicionando a class, que foi pega pelo longoBt, o active
});

function alterarContexto(contexto) { //a função para alterar as imagens e as cores, com o parametro contexto, onde recebe o parametro vindo de cada evento. 
    mostrarTempo();
    botoes.forEach(function (contexto) { //loop forEach para iterar por cada botão 
        contexto.classList.remove('active') //removendo o active usando o remove
    })
    html.setAttribute('data-contexto', contexto); //pegando o atributo data-contexto e atualizando o valor contexto com o valor vindo dos parametros de cada evento
    banner.setAttribute('src', `/imagens/${contexto}.png`); // pegando o atributo src e atualizando com o caminho das imagens de forma dinâmica, com o template string, porque estamos inserindo um valor javascript dentro deum conjunto de elementos HTML
    switch (contexto) { //usando a condição switch para pecorrer os atributos, passando o contexto por parametro 
        case "foco": //caso 1 pegando o foco, o valor do atributo 
            titulo.innerHTML = `Otimize sua produtividade,<br> 
             <strong class="app__title-strong">mergulhe no que importa.</strong>` //usando o innerHTML, método específico para trabalhar com textos no HTML
            break; //caso a iteração caia aqui, para encerrar 

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>` //usando o innerHTML, método específico para trabalhar com textos no HTML
            break; //caso a iteração caia aqui, para encerrar 

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>` //usando o innerHTML, método específico para trabalhar com textos no HTML
        default: //caso não ache nenhuma das opções, cairá no default (por padrão)
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){ //condição se for menor ou igual a zero, aconteça alguma coisa
        audioTempoFinalizado.play(); //adicionando a musica quando o tempo é finalizado
        alert('Tempo finalizado!') //e aparecerá esse alert 
        zerar() //se for menor ou igual a zero, a função zerar será executada
        return //interrompe o código
    }
    tempoDecorridoEmSegundos -= 1;  //fazendo o decremento 
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar); //adicionando o método addEventListener com o evento click, passando o callback(função) iniciarOuPausar, após o clique no botão acontecer

function iniciarOuPausar() {  //criando a função iniciarOuPausar
    if(intervaloId){ // condição para se intervaloId tiver algum valor, chamar a função zerar
        audioPausa.play(); //aidicioando a musica quando o audio é pausado 
        zerar() //aplicando a função zerar
        return //interrompe o código 
    }
    audioPlay.play(); //adicionando com a musica quando iniciar 
    intervaloId = setInterval(contagemRegressiva, 1000) //pegando a variavel intervaloId. O método sempre espera receber dois parametros. O primeiro pergunta qual método queremos que seja executado, nesse caso, quero que seja executado a função contagemRegressiva, então deve-se passa-la no primeiro paramento. O segundo valor esperado é em quanto tempo queremos que isso seja executado; queremos a cada 1 segundo, então, passaremos 1000, pois o valor é em milissegundos por padrão. 
    iniciarOuPausarBt.textContent = 'Pausar';
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/pause.png`);
}

function zerar() { //criando uma função zerar, para zerar a variavel intervaloId 
    clearInterval(intervaloId); //o clearInterval serve para interromper a execução de algum código. Passando como parametro o código que deseja ser interrompido, que no caso, intervaloId
    iniciarOuPausarBt.textContent = 'Começar';
    iniciarOuPausarBtIcone.setAttribute('src', `/imagens/play_arrow.png`);
    intervaloId = null; //Após ser interrompido, o intervaloId é setado novamente com o valor nulo. 
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();