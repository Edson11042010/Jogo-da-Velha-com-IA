const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const modoEscolha = document.getElementById("modoEscolha");
const btnReiniciar = document.getElementById("btnReiniciar");

let board = ["", "", "", "", "", "", "", "", ""];
let jogador = "X";
let ia = "O";
let fimDeJogo = false;
let modo = 1; // 1 = vs IA, 2 = 2 jogadores
let vezJogador = "X";

// Selecionar modo
function selecionarModo(m) {
  modo = parseInt(m);
  modoEscolha.style.display = "none";
  tabuleiro.style.display = "grid";
  btnReiniciar.style.display = "inline-block";
  criarTabuleiro();
}

// Cria tabuleiro
function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.id = i;
    celula.addEventListener("click", jogar);
    tabuleiro.appendChild(celula);
  }
}

// Jogada
function jogar(e) {
  const index = e.target.id;
  if (board[index] !== "" || fimDeJogo) return;

  if (modo === 1) {
    board[index] = jogador;
    atualizarTabuleiro();
    if (!checarVitoria(jogador)) {
      setTimeout(iaJogar, 300);
    }
  } else if (modo === 2) {
    board[index] = vezJogador;
    atualizarTabuleiro();
    if (!checarVitoria(vezJogador)) {
      vezJogador = vezJogador === "X" ? "O" : "X";
    }
  }
}

// IA simples (modo 1)
function iaJogar() {
  if (fimDeJogo) return;

  const vazio = board.map((v, i) => v === "" ? i : null).filter(i => i !== null);
  if (vazio.length === 0) return;

  const index = vazio[Math.floor(Math.random() * vazio.length)];
  board[index] = ia;
  atualizarTabuleiro();
  checarVitoria(ia);
}

// Atualiza tabuleiro
function atualizarTabuleiro() {
  for (let i = 0; i < 9; i++) {
    tabuleiro.children[i].innerText = board[i];
    tabuleiro.children[i].style.color = board[i] === "X" ? "#1a73e8" : "#d32f2f";
  }
}

// Checa vitória
function checarVitoria(j) {
  const vitorias = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let comb of vitorias) {
    if (comb.every(i => board[i] === j)) {
      mensagem.innerText = j + " venceu!";
      mensagem.style.color = j === "X" ? "#1a73e8" : "#d32f2f";
      fimDeJogo = true;
      return true;
    }
  }

  if (!board.includes("")) {
    mensagem.innerText = "Empate!";
    mensagem.style.color = "#555";
    fimDeJogo = true;
    return true;
  }

  return false;
}

// Reiniciar jogo
function reiniciar() {
  board = ["", "", "", "", "", "", "", "", ""];
  fimDeJogo = false;
  mensagem.innerText = "";
  vezJogador = "X";
  criarTabuleiro();
}
