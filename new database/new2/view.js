$(document).ready(function() {
	loadData();
	$("#searchBox").on("keyup",function(){
		var nameSearch = $(this).val();
		//delete all rows from table except the header
		$(function()
		{
		  $('#mytable tr').not(':nth-child(1)').remove()
		});
		var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
		db.transaction(function(tx){
			tx.executeSql('SELECT * FROM product where name like ?', 
				['%' + nameSearch +'%'],
					 function (tx, results) {
				var len = results.rows.length, i;
	  			var table = document.getElementById("mytable");
	  			for (i = 0; i < len; i++) {
	  				//insert new row at the bottom
					var row = table.insertRow(-1);
					var idCell = row.insertCell(0);
					var nameCell = row.insertCell(1);
					var priceCell = row.insertCell(2);

					idCell.innerHTML = results.rows.item(i).id;
			    	nameCell.innerHTML =results.rows.item(i).name;
			    	priceCell.innerHTML = results.rows.item(i).price;
	  			}
			});
		});
		});
});

function loadData(){
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function(tx){
		tx.executeSql('SELECT * FROM product', [],
				 function (tx, results) {
			var len = results.rows.length, i;
  			var table = document.getElementById("mytable");
  			for (i = 0; i < len; i++) {
  				//insert new row at the bottom
				var row = table.insertRow(-1);
				var idCell = row.insertCell(0);
				var nameCell = row.insertCell(1);
				var priceCell = row.insertCell(2);

				idCell.innerHTML = results.rows.item(i).id;
		    	nameCell.innerHTML =results.rows.item(i).name;
		    	priceCell.innerHTML = results.rows.item(i).price;
  			}
		});
	});
}