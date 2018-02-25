var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');


var app = express();


// Express Validator Middleware
app.use(expressValidator());


// View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));


app.use('/Pages/Management', express.static(path.join(__dirname, 'public')));



//bootstrap deleted
// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

//jQuery
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
//app.use('/Pages/Management', express.static(__dirname + '/node_modules/jquery/dist'));




app.get('/', function(req,res){
 res.render('index', {
  title: 'Default',
  Page: {
   title: "DefaultTitle"
  }
 });
});

app.get('/Pages/Management/ManageFreeBookings', function(req,res){
 res.render('Pages/Management/ManageFreeBookings', {
  title: 'ﻞﻴﻤﻋ ﻝﻮﺧﺩ ﻞﻴﺠﺴﺗ',
  Page: {
   title: "ﻞﻴﻤﻋ ﻝﻮﺧﺩ ﻞﻴﺠﺴﺗ"
  }
 });
});



app.post('/resedents/check_in', function(req, res){

 req.checkBody('contract-number', 'ﺪﻘﻌﻟا ﻢﻗﺭ ﺔﻓﺎﺿا ﻦﻣ ﺪﺑ ﻻ').notEmpty();

 var errors = req.validationErrors();

 if (errors) {
  console.log('errors');
 } else {
  var new_resedent = {
   contract_number: 001,
   reservation_source: null,
   rent_type:null,
   days:1,
   room:null,
   customer:null,
   notes:''
  }
  console.log('sucess');

 }
});

app.listen(3000, function(){
 console.log('Hi');
})