var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");

mongoose.connect("mongodb://localhost/authdemo");

var app = express();

app.set("view engine" , "ejs");
app.use(require("express-session")({
	secret: "A Millie A Millie",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req,res) {
	res.render("home");
});

app.get("/secret", function(req,res) {
	res.render("secret");
});

// Authentication Routes

app.get("/register", function(req,res){
	res.render("register");
});

app.post("/register", function(req,res){
	req.body.username
	req.body.password
	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err) {
			console.log(err);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function() {
			res.redirect("/secret");
		});
	});
});

// Login Routes

app.get("/login", function(req,res){
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}) ,function(req,res){
	
});












app.listen(3000, function () {
  console.log('The Server has Started!!');
});