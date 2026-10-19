const visor = document.getElementById("visor");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let iniciarNovoNumero = false;

function atualizarVisor() {
  visor.value = valorAtual;
}

function digitarNumero(numero) {
  if (iniciarNovoNumero) {
    valorAtual = numero === "." ? "0." : numero;
    iniciarNovoNumero = false;
  } else if (numero === ".") {
    if (!valorAtual.includes(".")) {
      valorAtual += ".";
    }
  } else {
    valorAtual = valorAtual === "0"
      ? numero
      : valorAtual + numero;
  }

  atualizarVisor();
}

function escolherOperador(novoOperador) {
  if (operador !== null && !iniciarNovoNumero) {
    calcular();
  }

  valorAnterior = Number(valorAtual);
  operador = novoOperador;
  iniciarNovoNumero = true;
}

function calcular() {
  if (operador === null || valorAnterior === null) return;

  const atual = Number(valorAtual);
  let resultado;

  switch (operador) {
    case "+":
      resultado = valorAnterior + atual;
      break;
    case "-":
      resultado = valorAnterior - atual;
      break;
    case "*":
      resultado = valorAnterior * atual;
      break;
    case "/":
      if (atual === 0) {
        valorAtual = "Erro: divisão por zero";
        operador = null;
        valorAnterior = null;
        iniciarNovoNumero = true;
        atualizarVisor();
        return;
      }
      resultado = valorAnterior / atual;
      break;
  }

  valorAtual = String(Number(resultado.toPrecision(10)));
  operador = null;
  valorAnterior = null;
  iniciarNovoNumero = true;
  atualizarVisor();
}

function limpar() {
  valorAtual = "0";
  valorAnterior = null;
  operador = null;
  iniciarNovoNumero = false;
  atualizarVisor();
}

function apagar() {
  if (iniciarNovoNumero) return;

  valorAtual = valorAtual.length > 1
    ? valorAtual.slice(0, -1)
    : "0";

  atualizarVisor();
}

document.querySelector(".botoes").addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");
  if (!botao) return;

  if (botao.dataset.numero !== undefined) {
    digitarNumero(botao.dataset.numero);
  } else if (botao.dataset.operador) {
    escolherOperador(botao.dataset.operador);
  } else if (botao.dataset.acao === "calcular") {
    calcular();
  } else if (botao.dataset.acao === "limpar") {
    limpar();
  } else if (botao.dataset.acao === "apagar") {
    apagar();
  }
});
       