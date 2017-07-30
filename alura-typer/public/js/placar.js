
var placar = $(".placar");
var botaoPlacar = $("#botao-placar");
var botaoSincroniza = $("#botao-sincroniza")

const intervaloAnimacaoRemover = 1000;
const intervaloAnimacaoPlacar = 600;

placar.hide();

botaoPlacar.click(mostrarPlacar);
botaoSincroniza.click(sincronizarPlacar);

function inserirLinhaPlacar() {
	let corpoTabela = placar.find("tbody");
	let usuario = "Edmilson";
	let numPalavras = contadorPalavras.text();

	let linha = novaLinhaPlacar(usuario, numPalavras);

	corpoTabela.append(linha);
	placar.slideDown(intervaloAnimacaoPlacar);
	scrollPlacar();
}

function scrollPlacar() {
	let distanciaTopo = placar.offset().top;
	$("body").animate({
		scrollTop: `${distanciaTopo}px`,
	}, 1000);
}

function novaLinhaPlacar(nomeUsuario, numPalavras) {
	let linha = $("<tr>");
	let colunaUsuario = $("<td>").text(nomeUsuario);
	let colunaPalavras = $("<td>").text(numPalavras);
	let colunaRemover = $("<td>");
	let link = $("<a>").addClass("botao-remover")
		.attr("href", "#");
	let icone = $("<i>").addClass("small")
		.addClass("material-icons").text("delete");

	link.append(icone);
	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);
	link.click(removerLinha);

	return linha;
}

function removerLinha() {
	event.preventDefault();
	let linha = $(this).parent().parent();
	linha.fadeOut(() => {
		linha.remove();
	});
}

function mostrarPlacar() {
	placar.stop().slideToggle(intervaloAnimacaoPlacar);
}


function atualizarPlacar() {
	$.get("http://localhost:3000/placar", function(dados) {
		$(dados).each(function() {
			let corpoTabela = placar.find("tbody");
			let linha = novaLinhaPlacar(this.usuario, this.pontos);
			corpoTabela.append(linha);
		});
	});
}

function sincronizarPlacar() {
	let placar = obterPontuacoesPlacar();
	let dados = { placar };
	$.post("http://localhost:3000/placar", dados, function() {
		console.log("Salvou o placar.");
	});
}

function obterPontuacoesPlacar() {
	let placar = [];
	let linhas = $("tbody > tr");
	linhas.each(function() {
		let usuario = $(this).find("td:nth-child(1)").text();
		let pontos = $(this).find("td:nth-child(2)").text();
		let score = {usuario, pontos};
		placar.push(score);
	});
	return placar;
}