// We are importing the express module 
var express = require("express");

// We are calling the express function 
// This function puts a new Express application
// inside the app variable.
// This is creating an instance of Express that we 
// can use to call the various Express functions
// that will help us build our server.
var app = express();

app.use(require("./middleware/headers"));

app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

// server will start up when it is run on port 3000
app.listen(3000,function(){
	console.log("app is listening on 3000");
});

