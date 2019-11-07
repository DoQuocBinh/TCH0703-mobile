const functions = require('firebase-functions');
const cors = require('cors')({origin: true}); //1

const admin = require('firebase-admin');
admin.initializeApp();

exports.saveData = functions.https.onCall((data,context)=>{
	var dbRef = admin.database().ref();
    var factValue = data.fact;
    console.warn(factValue);
    var factsRef = dbRef.child("facts");
    var newFact = factsRef.push();
    return newFact.set({
        fact: factValue
    }).then(()=>{
        return {message : 'insert done from function!'}
    })

})

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from GW!");
});

exports.simpleHTML = functions.https.onRequest((req,res)=>{
	res.send('<html><title>A simple page</title>' +
				'<body>' + '<input type="button" value="OK"/>' + '</body>');
				
});

exports.sayHi = functions.https.onRequest((req,res)=>{
	res.set('Access-Control-Allow-Origin', '*');  //2
	//get name from the client
	var name = req.body.name;
	//change from function
	var msg = 'Welcome ' + name;
	//send it back to client
	res.send(msg);

});

