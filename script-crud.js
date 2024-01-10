const btnAdicionarTarefa = document.querySelector('.app__button--add-task'); // Aqui começamos por selecionar os elementos que vamos precisar interagir no nosso código. // Esta linha pega o botão de adicionar tarefa baseado na classe CSS.
const formAdicionarTarefa = document.querySelector('.app__form-add-task'); // Da mesma forma, esta linha seleciona nosso formulário de adicionar tarefa.
const textarea = document.querySelector('.app__form-textarea'); // E aqui, pegamos a área de texto onde o usuário digita a descrição da tarefa.
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel'); 

//const tarefas = []; // Esta é a nossa lista (ou array) de tarefas. Ela começa vazia porque ainda não adicionamos nenhuma tarefa.
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];  //o método parse é o inverso do stringify. Ele converte uma string para um objeto 

function atualizarTarefas() { //criando ma função para atualizar o localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));  //acessando o localStorage e pegando o item 'tarefas' e transformando em strings
}

function criarElementoTarefa(tarefa) { //Aqui é uma função para criar elementos dentro no HTML, em tarefa
    const li = document.createElement('li'); //Aqui criando uma referencia constante chamada li, criando o elemento no html. Dentro do parametro é a tag HTML que será utilizada
    li.classList.add('app__section-task-list-item'); //Aqui adicionando a classe para o elemento, que poderá ser estilizada no CSS

    const svg = document.createElement('svg'); //Aqui criando uma referencia constante chamada svg, criando o elemento no HTML. Dentro do parametro é a tag HTML que será utilizada
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    ` //Pegando a referencia constante svg e passando a propriedade innerHTML, atribuindo uma imagem com as tags HTML, por isso foi usado o innerHTML

    const paragrafo = document.createElement('p');  // Criando uma referencia constante chamada paragrafo, criando o elemento no html. Dentro do parametro é a tag HTML que será utilizada
    paragrafo.textContent = tarefa.descricao; // usando textContent, pois estamos nos referindo especificamente a texto, sem tags HTML. O conteudo do texto é a descrição da tarefa que recebemos por parametro, então, tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description');

    const botao = document.createElement('button'); //criando uma referencia constante chamada botao, criando o elemento html. Dentro do parametro é a tag HTML que será utilizada
    botao.classList.add('app_button-edit');
    
    botao.onclick = () => { //pegou a referencia do botao e adicionou o onclick que receberá uma função após o botão ser clicado
        const novaDescricao = prompt("Qual é o novo nome da tarefa?"); //semelhante ao alert, exebira um prompt na tela com um campo para alterar a tarefa desejada
      console.log('NOva descrição da tarefa: ', novaDescricao)
      if (novaDescricao) { //fazendo uma validação com o if. o javascript vai interpretar um null como false e uma string vazia como false, uma string preenchida é true
          paragrafo.textContent = novaDescricao; //aqui pegamos o paragrafo e subscrevemos o que já existe e adicionamos o textContent, atualizando com o valor que será digitado no prompt (camada visual)
          tarefa.descricao = novaDescricao; //atualizando a refencia da tarefa, que é a camada de dados
          atualizarTarefas(); // atualizando o localStore
      }
    }

    const imagemBotao = document.createElement('img'); //criando uma referencia constante chamada imagemBotao, criando o elemento html. Dentro do parametro é a tag HTML que será utilizada
    imagemBotao.setAttribute('src', '/imagens/edit.png'); //O método setAttribute espera dois parametros. Nesse caso, definir o atributo src, e o segundo argumento é o valor para o atributo definido, nesse caso, o camaninho da imagem
    botao.append(imagemBotao);  //o método append serve para colocar "dentro", nesse caso, colocar a imagem dentro do botão

    li.append(svg); // o método append serve para colocar "dentro", nesse caso, colocar o svg dentro da li 
    li.append(paragrafo); // o método append serve para colocar "dentro", nesse caso, colocar o paragrafo dentro da li 
    li.append(botao); // o método append serve para colocar "dentro", nesse caso, colocar o botao dentro da li 

    return li //criou os elementos e retornou 
}

btnAdicionarTarefa.addEventListener('click', () => { // Agora, adicionamos um ouvinte de eventos ao botão. Quando o botão for clicado, esta função será executada.
    formAdicionarTarefa.classList.toggle('hidden'); // Esta linha vai alternar a visibilidade do nosso formulário. Lembra da classe 'hidden' que esconde elementos?
})

formAdicionarTarefa.addEventListener('submit', (evento) => { // Aqui, estamos ouvindo o evento de 'submit' do nosso formulário.  // Esse evento ocorre quando tentamos enviar o formulário (geralmente, apertando o botão 'Enter' ou clicando em um botão de submit).
    evento.preventDefault(); // Esta linha evita que a página recarregue (comportamento padrão de um formulário). Nós não queremos isso!
    const tarefa = { // Aqui, criamos um objeto tarefa com a descrição vinda da nossa textarea.
        descricao: textarea.value
    }
    tarefas.push(tarefa); // Depois, adicionamos essa tarefa ao nosso array de tarefas.
    const elementoTarefa = criarElementoTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
    atualizarTarefas(); // E, finalmente, armazenamos nossa lista de tarefas no localStorage.   // Convertendo o array para uma string com o stringify em formato JSON para poder armazenar. Aqui o stringify pega o objeto e transforma em string
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden'); // depois que o elemento for inseriado, o formulario é escondido 
})

tarefas.forEach(tarefa => {
   const elementoTarefa = criarElementoTarefa(tarefa);
   ulTarefas.append(elementoTarefa)
;}); 

const limparFormulario = () => {
    textarea.value = '';
    formularioTarefa.classList.add('hidder');
}

btnCancelar.addEventListener('click', limparFormulario);