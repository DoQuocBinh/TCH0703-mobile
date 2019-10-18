$(document).ready(function() {
  loadAll();
  //register the event search
  $("#searchBox").keyup(function(event) {
      performSearch(); //call the search function
  });
});

function performSearch(){
  var nameSearch = $("#searchBox").val();
  var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM product where name like ?'
      , ['%' + nameSearch +'%'], function (tx, results) {
       loadDataToTable(results);
     });
  });
}

function loadDataToTable(results){
  var len = results.rows.length, i;
    var table = document.getElementById("mytable");

    $(function()
    {
      $('#mytable tr').not(':nth-child(1)').remove()
    });

    for (i = 0; i < len; i++) {
    //insert new row at the bottom
    var row = table.insertRow(-1);
    var idCell = row.insertCell(0);
    var nameCell = row.insertCell(1);
    var priceCell = row.insertCell(2);
    var removeCell = row.insertCell(3);
      
      idCell.innerHTML = results.rows.item(i).id;
      nameCell.innerHTML =results.rows.item(i).name;
      priceCell.innerHTML = results.rows.item(i).price
      removeCell.innerHTML = "<button onclick='removeRow(this)' productId='" +  
                            results.rows.item(i).id + "'>Delete</button>";
    }
}
function removeRow(butt){
  var id = butt.getAttribute("productId");
  alert("Going to remove: " + id);
  deleteFromDB(id);
  loadAll();

}
function deleteFromDB(id){
  var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    var sql = "delete from product where id = ?";
    tx.executeSql(sql,[id]);
  });
}
function loadAll(){
  var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
  db.transaction(function (tx) {
      tx.executeSql('SELECT * FROM product', [], function (tx, results) {
     loadDataToTable(results);
    });
  });
}

