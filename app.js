var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
// const { check, validationResult } = require('express-validator/check');
// const { matchedData, sanitize } = require('express-validator/filter');
var mongojs = require('mongojs');

//routes

var index = require('./routes/index');
var login = require('./routes/login');
var manageFreeBookings = require('./routes/managefreebookings');
var reservations = require('./routes/Reservations');
var customers = require('./routes/customers');
var settings = require('./routes/settings');

var port = 3000;
var app = express();



// Express Validator Middleware
app.use(expressValidator());


// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile)

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// app.use(require('./public/js/ManageFreeBookings'));  


// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));
// or this app.use(express.static(__dirname + '/public'));

//bower_componants
 app.use(express.static(__dirname + '/bower_components'));


// jQuery
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

// hint.css
app.use(express.static(path.join(__dirname, 'node_modules', 'hint.css')));
// or this app.use(express.static(__dirname + '/node_modules/hint.css'));



app.use('/',index);
app.use('/LogIn',login);
app.use('/ManageFreeBookings' , manageFreeBookings);
app.use('/Reservations' , reservations);
app.use('/Customers' , customers);
app.use('/Settings' , settings);


app.listen(port, function () {
    console.log('Application is running on port '+port);
})