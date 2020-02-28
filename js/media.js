var db = openDatabase('banco', '1.0', 'primeiro banco', 2 * 1024 * 1024);

window.onload = function() {
    media();
}

function media() {
    db.transaction(function (tx) { 
            tx.executeSql('SELECT km, litros FROM consumos', [], function (tx, resultado) { 
               var qtd_linhas = resultado.rows.length, i;
               var kms = 0, litros = 0; 
               msg = "Linhas na tabela" + qtd_linhas; 
               
               for (i = 0; i < qtd_linhas; i++) { 
                  kms += Number(resultado.rows.item(i).km);
                  litros += Number(resultado.rows.item(i).litros);
               } 
               var media = kms / litros;
               msg += "<br>Km/litros: " + media;
             
               document.getElementById("saida").innerHTML = msg;
            }, null); 
         }); 
}