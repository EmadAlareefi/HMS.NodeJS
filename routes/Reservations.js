var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");
var ObjectId = require("mongodb").ObjectId;

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("Pages/reservations", {
        title: "الحجوزات",
        Page: {
          title: "الحجوزات"
        },
        checkIns: [],
        settings: []
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
            .collection("settings")
            .find({})
            .toArray((err, settings) => {
              if (err) {
                res.send(err);
              }
              res.render("Pages/reservations", {
                title: "الحجوزات",
                Page: {
                  title: "الحجوزات"
                },
                checkIns,
                settings
              });
            });
        });
    }
  });
});

module.exports = router;
