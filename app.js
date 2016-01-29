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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function(req,res) {
	res.render("home");
});

app.get("/secret", function(req,res) {
	res.render("secret");
})


app.listen(3000, function () {
  console.log('The Server has Started!!');
});