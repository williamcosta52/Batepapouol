inicializarProjeto();
let mensagem = [];
let caixaDeMensagens = document.querySelector(".mensagens");

function inicializarProjeto() {
  const iniciar = document.querySelector(".container");
  iniciar.innerHTML = `<div class="cabecalho">
  <div class="logo">
    <img src="./imagem/logo 1.png" />
  </div>
  <div class="icone">
    <ion-icon name="people"></ion-icon>
  </div>
</div>
<div class="menu-inferior">
  <div class="digitar-texto">
    <input type="text" value="" placeholder="Escreva aqui..." />
  </div>
  <div class="icone-baixo">
    <ion-icon name="paper-plane-outline"></ion-icon>
  </div>
</div>`;
}

login();

function login() {
  nome = prompt("Qual seu nome de usuário?");
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    { name: nome }
  );

  const participantes = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/participants"
  );
  console.log(participantes);
  promise.catch(deuRuim);
}
function deuRuim(error) {
  if (error.response.status === 400) {
    login();
  }
}
buscarMensagens();
function buscarMensagens() {
  promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

  promise.then(mandarMensagem);
}
function mandarMensagem(mesage) {
  caixaDeMensagens = "";
  mensagem = mesage.data;

  console.log(mensagem);

  for (let i = 0; i < mensagem.length; i++) {}

  caixaDeMensagens.innerHTML = `<div class="time">${mensagem.time}</div>

  <div class="user">${mensagem.user}</div>

  <div class="to">${mensagem.to}</div>

  <div class="message">${mensagem.text}</div>`;
}
