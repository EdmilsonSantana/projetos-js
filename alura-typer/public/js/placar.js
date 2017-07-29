
var placar = $(".placar");
var botaoPlacar = $("#botao-placar");

const intervaloAnimacaoRemover = 1000;
const intervaloAnimacaoPlacar = 600;

placar.hide();

botaoPlacar.click(mostrarPlacar);

function inserirLinhaPlacar() {
	let corpoTabela = placar.find("tbody");
	let usuario = "Edmilson";
	let numPalavras = contadorPalavras.text();

	let linha = novaLinhaPlacar(usuario, numPalavras);
	linha.find(".botao-remover").click(removerLinha);

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