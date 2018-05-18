var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
var expressHandlebars = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');
// var mongojs = require('mongojs');

//routes

var index = require("./routes/index");
var login = require("./routes/login");
var users = require("./routes/users");
var manageFreeBookings = require("./routes/managefreebookings");
var reservations = require("./routes/Reservations");
var customers = require("./routes/customers");
var settings = require("./routes/settings");
var Reports = require("./routes/Reports");
var Services = require("./routes/Services");
var Bills = require("./routes/Bills");
var Purchases = require("./routes/Purchases");
var port = 3000;
var app = express();

// Express Validator Middleware
app.use(expressValidator());
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());


// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  
  next();
});


// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);


// Body Parser Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// app.use(require('./public/js/ManageFreeBookings'));

// Set Static Path
app.use(express.static(path.join(__dirname, "public")));
// or this app.use(express.static(__dirname + '/public'));

//bower_componants
app.use(express.static(__dirname + "/bower_components"));

// jQuery
app.use(express.static(__dirname + "/node_modules/jquery/dist"));

// hint.css
app.use(express.static(path.join(__dirname, "node_modules", "hint.css")));
// or this app.use(express.static(__dirname + '/node_modules/hint.css'));

app.use("/", index);
app.use("/LogIn", login);
app.use("/ManageFreeBookings", manageFreeBookings);
app.use("/Reservations", reservations);
app.use("/Customers", customers);
app.use("/Settings", settings);
app.use("/Reports", Reports);
app.use("/Services", Services);
app.use("/Bills", Bills);
app.use("/Purchases", Purchases);




// Set Port
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
// app.listen(port, function () {
//     console.log('Application is running on port '+port);
// })
