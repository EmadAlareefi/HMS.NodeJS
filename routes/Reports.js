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

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
    res.render("Pages/Reports", {
        title: "التقارير",
        Page: {
          title: "التقارير"
        },

        checkIns: [],
        customers: [],
        accounts: [],
        services: [],
        Purchases: [],
        rooms: []

      });
      console.log("Error connecting the database" + err);
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("checkIns")
        .find({})
        .toArray((err, checkIns) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
      dbo
        .collection("customers")
        .find({})
        .toArray((err, customers) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
      dbo
        .collection("accounts")
        .find({})
        .toArray((err, accounts) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
      dbo
        .collection("services")
        .find({})
        .toArray((err, services) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
      dbo
          .collection("Purchases")
          .find({})
          .toArray((err, Purchases) => {
            if (err) {
              console.log("Error connecting the database" + err);
            }
      dbo
            .collection("rooms")
            .find({})
            .toArray((err, rooms) => {
              if (err) {
                console.log("Error connecting the database" + err);
              }

      dbo
            .collection("settings")
            .find({})
            .toArray((err, settings) => {
              if (err) {
                res.send(err);
              }
      
              res.render("Pages/Reports", {
                title: "إدارة التقارير",
                Page: {
                  title: "إدارة التقارير"
                },
                checkIns,
                customers,
                accounts,
                services,
                Purchases,
                rooms,                
                settings
              });
            });
        });
    });
  });
});
});
});
}
});
});


module.exports = router;