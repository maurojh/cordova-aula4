var db;
var totalVendas;

window.onload = function () {
    console.log("onload");
    iniciaBanco();
    var botaoSalvar = document.getElementById("btnSalvar");
    botaoSalvar.addEventListener("click", salvar);
}

function iniciaTabela() {
    console.log("iniciaTabela");
    db.transaction(function (tx) {
        tx.executeSql('SELECT vendas FROM loja', [], function (tx, resultado) {
            var qtd_linhas = resultado.rows.length;
            if (qtd_linhas == 0) {
                tx.executeSql('INSERT INTO loja (vendas) VALUES ("0")', [], null);
            }
        });
    }, null, carregaVendas);
}

function iniciaBanco() {
    console.log("iniciaBanco");
    db = openDatabase('banco', '1.0', 'primeiro banco', 2 * 1024 * 1024);

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS loja (id INTEGER PRIMARY KEY AUTOINCREMENT, vendas TEXT NOT NULL)');
        var saida = document.getElementById("saida");
        saida.innerHTML = "Banco e tabela criados";
    }, null, iniciaTabela);
}

function carregaVendas() {
    console.log("carregaVendas");
    db.transaction(function (tx) {
        tx.executeSql('SELECT vendas FROM loja', [], function (tx, resultado) {
            var qtd_linhas = resultado.rows.length,
                i;
            totalVendas = 0;

            for (i = 0; i < qtd_linhas; i++) {
                totalVendas += Number(resultado.rows.item(i).vendas);
            }
        }, null);
    });
}

function salvar() {
    var campo = document.getElementById("venda");
    var vendido = Number(campo.value);

    totalVendas += vendido;

    db.transaction(function (tx) {
        tx.executeSql('UPDATE loja SET vendas=? WHERE id=1', [totalVendas+""]);
    }, null, mostraGanho);
}

function mostraGanho() {
    var ganho = Number(totalVendas) * 0.09 + 200;
    var saida = document.getElementById("saida");
    saida.innerHTML = ganho;
}
