var botaoFrase = $("#botao-frase");
var botaoFraseId = $("#botao-frase-id");
var campoFraseId = $("#frase-id");
var campoFrase = $(".frase");
var mensagemErro = $("#erro");
var spinner = $("#spinner");

botaoFrase.click(getFraseAleatoria);
botaoFraseId.click(buscarFrase);

function getFraseAleatoria() {
	getFrases(trocarFrase);
}

function buscarFrase() {
	var fraseId = campoFraseId.val();
	getFrases((frase) => trocarFrase([frase,]), fraseId)
}

function getFrases(callback, id=null) {
	spinner.show();
	let dados = {}
	if(id != null) {
		dados.id = id;
	}
	$.get("http://localhost:3000/frases", dados, callback)
		.fail(() => {
			mensagemErro.show();
			setTimeout(() => mensagemErro.hide(), 1500);
		})
		.always(() => {
			spinner.toggle();
		});
}

function trocarFrase(frases) {
	let numeroAleatorio = Math.floor(Math.random() * frases.length);
	campoFrase.text(frases[numeroAleatorio].texto)
	atualizarTamanhoFrase();
	atualizarTempoInicial(frases[numeroAleatorio].tempo);
}

