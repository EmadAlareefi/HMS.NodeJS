var express = require("express");
var router = express.Router();
var mongojs = require("mongojs");
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/", (req, res, next) => {
  // MongoClient.connect(url, (err, db) => {
  //   if (err) throw err;

  //   dbo = db.db(dbName);
  //   dbo
  //     .collection("settings")
  //     .find({})
  //     .toArray((err, settings) => {
  //       if (err) {
  //         res.send(err);
  //       }
        res.render("Pages/settings", {
          title: "الإعدادات",
          Page: {
            title: "الإعدادات"
          },
          // settings

        });
      });
  // });
// });

router.post("/addRoomType", (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    dbo = db.db(globals.dbName);
  });
});

module.exports = router;
