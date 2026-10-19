
const visor = document.getElementById("tela");

let valorAtual = "0";
let valorAnterior = null;
let operador = null;
let iniciarNovoNumero = false;

// Atualiza o visor da calculadora
function atualizarVisor() {
  visor.value = valorAtual;
}

// Adiciona números e ponto decimal
function adicionar(valor) {
  // Se for um operador, guarda o valor atual
  if (["+", "-", "*", "/"].includes(valor)) {
    escolherOperador(valor);
    return;
  }

  // Se acabou de calcular ou escolheu um operador
  if (iniciarNovoNumero) {
    valorAtual = valor === "." ? "0." : valor;
    iniciarNovoNumero = false;
    atualizarVisor();
    return;
  }

  // Evita dois pontos decimais
  if (valor === ".") {
    if (!valorAtual.includes(".")) {
      valorAtual += ".";
    }
  } else {
    valorAtual = valorAtual === "0"
      ? valor
      : valorAtual + valor;
  }

  atualizarVisor();
}

// Escolhe a operação matemática
function escolherOperador(novoOperador) {
  if (operador !== null && !iniciarNovoNumero) {
    calcular();
  }

  valorAnterior = Number(valorAtual);
  operador = novoOperador;
  iniciarNovoNumero = true;
}

// Realiza o cálculo
function calcular() {
  if (operador === null || valorAnterior === null) {
    return;
  }

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

// Limpa a calculadora
function limpar() {
  valorAtual = "0";
  valorAnterior = null;
  operador = null;
  iniciarNovoNumero = false;

  atualizarVisor();
}

// Apaga o último caractere
function apagar() {
  if (iniciarNovoNumero) {
    return;
  }

  valorAtual = valorAtual.length > 1
    ? valorAtual.slice(0, -1)
    : "0";

  if (valorAtual === "-" || valorAtual === "") {
    valorAtual = "0";
  }

  atualizarVisor();
}
