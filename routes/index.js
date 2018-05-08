var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");
var User =  require("./user");



router.get("/",globals.ensureAuthenticated,(req, res, next) => {

  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("index", {
        title: "الرئيسية",
        Page: {
          title: "الرئيسية"
        },
        rooms: []
      });
      console.log("Error connecting the database" + err);
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("rooms")
        .find({})
        .toArray((err, rooms) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
          res.render("index", {
            title: "الرئيسية",
            Page: {
              title: "الرئيسية"
            },
            rooms
          });
        });
    }
  });
});


router.get('/register', function (req, res) {
  res.render("register", {
    title: "انشاء مستخدم",
    Page: {
      title: "انشاء مستخدم"
    },
    mail:"",
    errors:""
  });});


// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	}
	else {
		//checking for email and username are already taken
		User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
	}}, function (err, user) {
			User.findOne({ email: { 
				"$regex": "^" + email + "\\b", "$options": "i"
		}}, function (err, mail) {
				if (user || mail) {
					res.render('register', {
						user: user,
						mail: mail
					});
				}
				else {
					var newUser = new User({
						name: name,
						email: email,
						username: username,
						password: password
					});
					User.createUser(newUser, function (err, user) {
						if (err) throw err;
						console.log(user);
					});
         	req.flash('success_msg', 'You are registered and can now login');
					res.redirect('/login');
				}
			});
		});
	}
});

router.get('/logout', function (req, res) {
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});


//Create Database in the local mongoDB //
router.get("/createDB/:dbname/:collection", (req, res, next) => {
  if (req.params.dbname) {
    url = "mongodb://localhost:27017/" + req.params.dbname + "";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database " + req.params.dbname + " Created");
      var dbo = db.db(req.params.dbname);
      dbo.createCollection(req.params.collection, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
      res.send("Database " + req.params.dbname + " Created");
    });
  }
});

router.get("/dropDB/:dbname", (req, res, next) => {
  if (req.params.dbname) {
    url = "mongodb://localhost:27017/" + req.params.dbname + "";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(req.params.dbname);
      dbo.dropDatabase();
      res.send("Database " + req.params.dbname + " Deleted!");
    });
  }
});

//========Needs plan upgrade============//
// router.get('/createDB/:dbname', (req,res,next) => {
//     if(req.params.dbname){
//         mongojs("mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/"+ req.params.dbname +"?authSource=admin$replicaSet=rs-ds255588");
//         url = "mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/"+ req.params.dbname +"";
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             console.log('Database ' + req.params.dbname + ' Created');
//             db.close();
//           });
//     }

// });

module.exports = router;
