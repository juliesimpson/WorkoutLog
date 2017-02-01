require("dotenv").config();

// We are importing the express module 
var express = require("express");

// We are calling the express function 
// This function puts a new Express application
// inside the app variable.
// This is creating an instance of Express that we 
// can use to call the various Express functions
// that will help us build our server.
var app = express();

// this package will help the server parse out incoming 
// requests that are easier to work with.
var bodyParser = require("body-parser");

var sequelize = require("./db");

var User = sequelize.import("./models/user"); 

// creates the table in postgres
// matches the model we defined
// Doesn't drop the db, and helps with data persistence
//User.sync();
//User.sync( {force: true}) WARNING: This will DROP the table!
sequelize.sync();

// tells the application to use bodyParser.
// body parser will parse data off incoming
// requests and turn it into JSON.
// It will take that JSON and expose it to be used for req.body
app.use(bodyParser.json());

app.use(require("./middleware/headers"));
app.use(require("./middleware/validate-session"));

app.use("/api/user", require("./routes/user"));
// login route
app.use("/api/login", require("./routes/session"));
app.use("/api/definition", require("./routes/definition"));
app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

// server will start up when it is run on port 3000
app.listen(3000,function(){
	console.log("app is listening on 3000");
});

