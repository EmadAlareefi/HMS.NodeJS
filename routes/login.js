var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

var User =  require("./user");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

router.get("/", (req, res, next) => {
    res.render("login", {
        title: "تسجيل الدخول",
        Page: {
          title: "تسجيل الدخول"
        }
      });
});



passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});


router.post('/login',
	passport.authenticate('local', { successRedirect: '../', failureRedirect: '/', failureFlash: true }),
	function (req, res) {
		res.redirect('../');
	});



module.exports = router;
