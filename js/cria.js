// openDatabase(nome, versao, descricao, tamanho do banco)
var db = openDatabase('banco', '1.0', 'primeiro banco', 2 * 1024 * 1024);


// transaction: se algo der errado não altera o banco:
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE consumos (id INTEGER PRIMARY KEY AUTOINCREMENT, litros TEXT NOT NULL, km TEXT NOT NULL)');
    tx.executeSql('INSERT INTO consumos (id, litros, km) VALUES (1, "5.5", "40.0")');
    var saida = document.getElementById("saida");
    saida.innerHTML = "Tabela criada";
});