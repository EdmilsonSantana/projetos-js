'use strict';


const intervalo = 1000;
var campoFrase = $(".frase");
var tamanhoFrase = $("#tamanho-frase");
var campo = $(".campo-digitacao");
var contadorPalavras = $("#contador-palavras")
var contadorCaracteres = $("#contador-caracteres");
var tempoDigitacao = $("#tempo-digitacao");
var botaoReiniciar = $("#botao-reiniciar");
var botaoRemover = $(".botao-remover");
var placar = $(".placar");

var tempoInicial = tempoDigitacao.text();

$(() => {
	atualizarTamanhoFrase();
	inicializarContadores();
	inicializarCronometro();
	inicializarMarcadores();
	botaoReiniciar.click(reiniciarJogo);
	botaoRemover.click(removerLinha);
});


function contarPalavras(texto) {
	return texto.split(/\S+/).length - 1;
}

function atualizarTamanhoFrase() {
	let numPalavras = contarPalavras(campoFrase.text());
	tamanhoFrase.text(numPalavras);
}

function inicializarContadores() {

	campo.on("input", () => {
		let conteudo = campo.val();
		
		let qtdPalavras = contarPalavras(conteudo);
		
		contadorPalavras.text(qtdPalavras);
		contadorCaracteres.text(conteudo.length);
	});
}

function inicializarCronometro() {
	let tempoRestante = tempoInicial;

	campo.one("focus", ()=> {
		let cronometroId = setInterval(() => {
			botaoReiniciar.attr("disabled", true);
			tempoRestante--;
			tempoDigitacao.text(tempoRestante);
			if(tempoRestante < 1 ) {
				clearInterval(cronometroId);
				finalizarJogo();
			}
		}, intervalo);
	});
}

function finalizarJogo() {
	campo.attr("disabled", true);
	botaoReiniciar.attr("disabled", false);
	campo.toggleClass("campo-desativado");
	inserirLinhaPlacar();
}

function inicializarMarcadores() {
	let frase = campoFrase.text();
	campo.on("input", ()=> {
		let digitado = campo.val();

		if(frase.startsWith(digitado)) {
			campo.addClass("campo-correto");
			campo.removeClass("campo-errado");
		} else {
			campo.addClass("campo-errado");
			campo.removeClass("campo-correto");
		}
	});
}

function reiniciarJogo() {
	campo.attr("disabled", false);
	campo.val("");
	campo.toggleClass("campo-desativado");
	campo.removeClass("campo-errado");
	campo.removeClass("campo-correto");
	contadorPalavras.text("0");
	contadorCaracteres.text("0");
	tempoDigitacao.text(tempoInicial);
	inicializarCronometro();
}


