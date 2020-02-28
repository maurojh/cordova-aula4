var db = openDatabase('banco', '1.0', 'primeiro banco', 2 * 1024 * 1024);

window.onload = function() {
    var botao = document.getElementById("botao");
    botao.addEventListener("click", salvar);
}

function salvar() {
    var litros = document.getElementById("litros");
    var km = document.getElementById("km");

    var valor_litros = litros.value;
    var valor_km = km.value;

    if (valor_litros != "" && valor_km != "") {
        valor_litros = valor_litros.replace(",", ".");
        valor_km = valor_km.replace(",",".");
        
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO consumos ( litros, km) VALUES ( ?, ?)', [valor_litros, valor_km]);
            var saida = document.getElementById("saida");
            saida.innerHTML = "Item salvo";
        });
    }




}
