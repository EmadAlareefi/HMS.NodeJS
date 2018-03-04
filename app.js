var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');

//routes

var index = require('./routes/index');
var ManageFreeBookings = require('./routes/managefreebookings');
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


// jQuery
app.use(express.static(__dirname + '/node_modules/jquery/dist'));

// hint.css
app.use(express.static(path.join(__dirname, 'node_modules', 'hint.css')));
// or this app.use(express.static(__dirname + '/node_modules/hint.css'));



app.post('/check_in', function (req, res) {

    req.checkBody('contract-number', 'ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ ﺭﻗﻢ اﻟﻌﻘﺪ').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        console.log('errors');
    } else {
        var new_resedent = {
            contract_number: 001,
            reservation_source: null,
            rent_type: null,
            days: 1,
            room: null,
            customer: null,
            notes: ''
        }
        console.log('sucess');

    }
});

app.use('/',index);
app.use('/ManageFreeBookings' , ManageFreeBookings);
app.use('/settings' , settings);


app.listen(port, function () {
    console.log('Application is running on port '+port);
})