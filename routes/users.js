var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
      res.render("login", {
        title: "تسجيل الدخول",
        Page: {
          title: "تسجيل الدخول"
        }
  });
});


module.exports = router;
