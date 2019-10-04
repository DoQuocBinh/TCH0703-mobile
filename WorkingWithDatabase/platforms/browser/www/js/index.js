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
       document.querySelector('#status').innerHTML +=  msg; 

       for (i = 0; i < len; i++) { 
          msg = "<p><b>" + results.rows.item(i).log + "</b></p>"; 
          document.querySelector('#status').innerHTML +=  msg; 
      } 
  }, null);
}); 
}
function createDatabase(){
    var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);  

    db.transaction(function (tx) { 
     tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
     tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")'); 
     tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")'); 
     console.log('done! ');
 });
}