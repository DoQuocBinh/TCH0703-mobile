$("#insert").click(function(event) {
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
  	tx.executeSql('CREATE TABLE IF NOT EXISTS product (id integer primary key autoincrement, name text, price number)');
  	var name = $("#name").val();
  	var price = $("#price").val();
  	alert(name);
  	var sql = "insert into product(name,price) values(?,?) ";
  	tx.executeSql(sql,[name,price]);
	});

});