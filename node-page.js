// web stuff
var express = require("express");
var cookie = require("cookie-parser");
var path = require("path");
var bodyParser = require('body-parser');
var session = require("express-session")({
	secret: "kickEEwinTI",
    resave: true,
    saveUninitialized: false
});

// initialize app
var app = express();
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'www/public')));
app.use(cookie());
app.set("view engine", "pug");
app.set("views", "./www/pug/page");

// catch all GET requests
app.get('*', function(req, res, next) {
	console.log(req.socket.address(), req.method, req.url);
	next();
});

app.get("/", function(req, res) {
	res.render('index', {session:req.session});
});


app.get("/index", function(req, res) {
	res.render('index', {session:req.session});
});


// 404
app.get("/*", function(req, res) {
	res.render("error", {page:req.params[0]});
});

// catch all POST requests
app.post('*', function(req, res, next) {
	console.log(req.socket.address(), req.method, req.url);
	console.log(req.body);
	next();
});

// start listening on socket.io
var server = app.listen(80, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("listening at http://%s:%s", host, port);
});
