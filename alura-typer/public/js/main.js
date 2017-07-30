'use strict';


const intervalo = 1000;
var campoFrase = $(".frase");
var tamanhoFrase = $("#tamanho-frase");
var campo = $(".campo-digitacao");
var contadorPalavras = $("#contador-palavras")
var contadorCaracteres = $("#contador-caracteres");
var tempoDigitacao = $("#tempo-digitacao");
var botaoReiniciar = $("#botao-reiniciar");

var tempoInicial = tempoDigitacao.text();

$(() => {
	atualizarTamanhoFrase();
	inicializarContadores();
	inicializarCronometro();
	inicializarMarcadores();
	botaoReiniciar.click(reiniciarJogo);
	atualizarPlacar();
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
	campo.one("focus", ()=> {
		let tempoRestante = tempoInicial;
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
	campo.on("input", ()=> {
		let frase = campoFrase.text();
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

function atualizarTempoInicial(tempo) {
	tempoInicial = tempo;
	tempoDigitacao.text(tempo);
}

