const tela = document.getElementById("tela");

let expressao = "";
let resultadoMostrado = false;

function adicionar(valor) {
    const operadores = ["+", "-", "*", "/"];

    if (tela.value === "Erro") {
        expressao = "";
    }

    if (resultadoMostrado) {
        if (!operadores.includes(valor)) {
            expressao = "";
        }
        resultadoMostrado = false;
    }

    if (operadores.includes(valor)) {
        if (expressao === "" && valor !== "-") {
            return;
        }

        const ultimo = expressao.slice(-1);

        if (operadores.includes(ultimo)) {
            expressao = expressao.slice(0, -1);
        }
    }

    if (valor === ".") {
        const parteAtual = expressao.split(/[+\-*/]/).pop();

        if (parteAtual.includes(".")) {
            return;
        }

        if (parteAtual === "") {
            valor = "0.";
        }
    }

    expressao += valor;
    tela.value = expressao;
}

function limpar() {
    expressao = "";
    tela.value = "0";
    resultadoMostrado = false;
}

function apagar() {
    if (tela.value === "Erro" || resultadoMostrado) {
        limpar();
        return;
    }

    expressao = expressao.slice(0, -1);
    tela.value = expressao || "0";
}

function calcular() {
    if (!expressao) return;

    try {
        // Aceita somente números e operadores matemáticos.
        