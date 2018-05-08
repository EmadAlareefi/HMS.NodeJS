var express = require("express");
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
var router = express.Router();
var mongojs = require("mongojs");
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
var globals = require("./globals");
// var url = 'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb';
// var db = mongojs('mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb', ['bookingTypes']);
// var url = "mongodb://localhost:27017/";
// var dbName = "hmsdb";
// var db = mongojs(url + dbName, ["bookingSrc"]);

router.get("/",globals.ensureAuthenticated, function(req, res, next) {
 
      res.render("Pages/Reports", {
        title: "التقارير",
        Page: {
          title: "التقارير"
        }
      
      });
    
});

module.exports = router;
