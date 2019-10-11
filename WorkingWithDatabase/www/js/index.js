var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        

        console.log('Received Event: ' + id);
    }
};
function viewData(){
 var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);     
 var msg; 
 
 db.transaction(function (tx) { 
    tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) { 
       var len = results.rows.length, i; 

       msg = "<p>Found rows: " + len + "</p>"; 
       msg += '<table width="500px" data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke">';
       msg += '<thead> <tr><th>Id</th><th>Log</th></tr></thead><tbody>';
       

      for (i = 0; i < len; i++) { 
          msg += "<tr><td>" +results.rows.item(i).id + "</td><td>" + results.rows.item(i).log + "</td></tr>"; 
          //document.querySelector('#status').innerHTML +=  msg; 
      } 
      msg += "</tbody></table>";
     
      document.querySelector('#status').innerHTML =  msg; 
  }, null);
}); 
}
 $("#create").click(function(event) {
      createDatabase();
  });
function createDatabase(){
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);  

    db.transaction(function (tx) { 
    var id = document.getElementById("id").value;
    var log = document.getElementById("log").value;  
    var sql = 'INSERT INTO LOGS (id, log) VALUES (' + 
    id + 
    ', "' + 
    log +' ")'
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql(sql); 
    alert('Insertion done! ');
 });
}