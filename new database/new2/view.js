function populateTable(results){
	//delete all rows from table except the header
	$(function()
	{
	  $('#mytable tr').not(':nth-child(1)').remove()
	});
	var len = results.rows.length, i;
	var table = document.getElementById("mytable");
	for (i = 0; i < len; i++) {
		//insert new row at the bottom
		var row = table.insertRow(-1);
		var idCell = row.insertCell(0);
		var nameCell = row.insertCell(1);
		var priceCell = row.insertCell(2);
		var removeCell = row.insertCell(3);

		idCell.innerHTML = results.rows.item(i).id;
		nameCell.innerHTML =results.rows.item(i).name;
		priceCell.innerHTML = results.rows.item(i).price;
		removeCell.innerHTML = "<button onclick='removeRow(this)' productid='"
			+results.rows.item(i).id  + "'>Delete</button>"; 
	}
}
function deleteRowFromDB(productid){
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
		db.transaction(function (tx) {
		  	var sql = "delete from product where id = ?";
		  	tx.executeSql(sql,[productid]);
		});
}
function removeRow(id){
	var productid = id.getAttribute('productid');
	alert('you are deleting ' + productid);
	deleteRowFromDB(productid);
	loadData();
} 

$(document).ready(function() {
	loadData();
	$("#searchBox").on("keyup",function(){
		var nameSearch = $(this).val();
		var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM product where name like ?', 
				['%' + nameSearch +'%'],
					 function (tx, results) {
						populateTable(results);
	  			
					});
		});
	});
});

function loadData(){
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM product', [],
				 function (tx, results) {
			populateTable(results);
		});
	});
}