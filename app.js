var express = require("express");
var mongoose.connect("mongodb://localhost/authdemo");

var app = express();
app.set("view engine" , "ejs");

app.get("/", function(req,res) {
	res.render("home");
});

app.get("/secret", function(req,res) {
	res.render("secret");
})


app.listen(3000, function () {
  console.log('The Server has Started!!');
});