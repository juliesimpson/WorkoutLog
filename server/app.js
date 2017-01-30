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
var Sequelize = require("sequelize");
var sequelize = new Sequelize("workoutlog", "postgres", "Youarein69", {
	host: "localhost",
	dialect: "postgres"
});

sequelize.authenticate().then(
	function() {
		console.log("connected to workoutlog postgres db");

	},
	function(err) {
		console.log(err);
	}
);

// build a user model in sqllize
var User = sequelize.define("user", {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});	

// creates the table in postgres
// matches the model we defined
// Doesn't drop the db, and helps with data persistence
User.sync();
// User.sync({force:true}); //drops the table completely

// tells the application to use bodyParser.
// body parser will parse data off incoming
// requests and turn it into JSON.
// It will take that JSON and expose it to be used for req.body
app.use(bodyParser.json());

app.post("/api/user", function(req, res) {
	// when we post to api user, it will want a user object in the body
	var username = req.body.user.username;
	var pass = req.body.user.password;
	
	// Need to create a user object and use sequelize to put that user into
	// our database.
	// Match the model we create above
	// Sequelize - take the user model and go out to the db and create this:
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		// Sequelize is going to return the object it created from db.
		function createSuccess(user){
			// successful get this:
			res.json({
				user: user,
				message: "create"
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);


});


app.use(require("./middleware/headers"));

app.use("/api/test", function(req, res) {
	res.send("Hello World");
});

// server will start up when it is run on port 3000
app.listen(3000,function(){
	console.log("app is listening on 3000");
});

