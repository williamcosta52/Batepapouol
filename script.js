let mensagem = [];
let caixaDeMensagens;
let input;
inicializarProjeto();
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
<div class="mensagens"></div>
<div class="menu-inferior">
  <div class="digitar-texto">
    <input data-test="input-message" type="text" value="" placeholder="Escreva aqui..." />
  </div>
  <div class="icone-baixo" onclick="enviarMensagem()">
    <ion-icon data-test="send-message" name="paper-plane-outline"></ion-icon>
  </div>
</div>`;

  caixaDeMensagens = document.querySelector(".mensagens");
  input = document.querySelector("input");
}

login();

function login() {
  nome = prompt("Qual seu nome de usuário?");
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    { name: nome }
  );
  promise.then(verificaOnline);

  promise.catch(deuRuim);
}
function verificaOnline() {
  setInterval(verificando, 5000);
  setInterval(buscarMensagens, 3000);
}
function verificando() {
  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/status",
    { name: nome }
  );
}
function deuRuim(error) {
  if (error.response.status === 400) {
    login();
  }
}
function buscarMensagens() {
  promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

  promise.then(mandarMensagem);
}
function mandarMensagem(message) {
  console.log(message.data);
  caixaDeMensagens.innerHTML = "";
  mensagem = message.data;

  for (let i = 0; i < mensagem.length; i++) {
    if (mensagem[i].type === "status") {
      caixaDeMensagens.innerHTML += `
    <div class="mensagem entrada" data-test="message">
      <div class="time ">(${mensagem[i].time})</div>

      <div class="user "><span>${mensagem[i].from}</span></div>
  
      <div class="message ">${mensagem[i].text}</div>
    </div>`;
    }
    if (mensagem[i].type === "message") {
      caixaDeMensagens.innerHTML += `
    <div class="mensagem mensagem-normal" data-test="message">
      <div class="time ">(${mensagem[i].time})</div>

      <div class="user "><span>${mensagem[i].from}</span> para</div>
  
      <div class="to ">${mensagem[i].to}:</div>
  
      <div class="message ">${mensagem[i].text}</div>
    </div>`;
    }
    if (
      mensagem[i].type === "private_message" &&
      (mensagem[i].to === nome || mensagem[i].to === "Todos")
    ) {
      caixaDeMensagens.innerHTML += `
      <div class="mensagem mensagem-privada" data-test="message">
        <div class="time ">(${mensagem[i].time})</div>
  
        <div class="user "><span>${mensagem[i].from}</span> reservadamente para </div>
    
        <div class="to ">${mensagem[i].to}:</div>
    
        <div class="message ">${mensagem[i].text}</div>
      </div>`;
    }
    caixaDeMensagens.lastChild.scrollIntoView();
  }
}
function enviarMensagem() {
  let texto = input.value;

  console.log(texto);

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/messages",
    {
      from: nome,
      to: "Todos",
      text: texto,
      type: "message",
    }
  );

  promise.then(mensagemEnviada);
  promise.catch(mensagemNaoEnviada);
}
function mensagemEnviada(enviou) {
  buscarMensagens();
  input.value = "";
}
function mensagemNaoEnviada(naoEnviou) {
  window.location.reload();
}
