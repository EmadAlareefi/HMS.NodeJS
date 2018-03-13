var express = require("express");
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
var router = express.Router();
var mongojs = require("mongojs");
var MongoClient = require("mongodb").MongoClient;

// var globals = require("./globals");
// var url = 'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb';
// var db = mongojs('mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb', ['bookingTypes']);
var url = "mongodb://localhost:27017/";
var dbName = "hmsdb";
// var db = mongojs(url + dbName, ["bookingSrc"]);

router.get("/", function(req, res, next) {
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    dbo = db.db(dbName);
    dbo
      .collection("bookingSrc")
      .find({})
      .toArray((err, bookingSrc) => {
        if (err) {
          res.send(err);
        }
        dbo
          .collection("bookingTypes")
          .find({})
          .toArray((err, bookingTypes) => {
            if (err) {
              res.send(err);
            }
            dbo
              .collection("rooms")
              .find({})
              .toArray((err, rooms) => {
                if (err) {
                  res.send(err);
                }
                dbo
                  .collection("settings")
                  .find({})
                  .toArray((err, settings) => {
                    if (err) {
                      res.send(err);
                    }
                    res.render("Pages/Management/ManageFreeBookings", {
                      title: "الشقق والتسكين",
                      Page: {
                        title: "الشقق والتسكين"
                      },
                      bookingSrc,
                      bookingTypes,
                      rooms,
                      settings
                    });
                  });
              });
          });
      });
  });
});

router.post("/checkIn", (req, res, net) => {
  var checkIn = req.body;
  console.log(req.body);

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;

    dbo = db.db(dbName);
    var new_checkIn = {
      contract_number: 001,
      bookingType: body.bookingType,
      bookingSrc: body.bookingSrc,
      days: 1,
      roomNumber: null,
      customer: null,
      notes: ""
    };

    dbo.collection("checkIns").save(checkIn, (err, result) => {
      if (err) throw err;
      res.redirect("/ManageFreeBookings");
      db.close();
    });
  });
});

// router.post("/check_in", function(req, res) {
//   req.checkBody("contract-number", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ ﺭﻗﻢ اﻟﻌﻘﺪ").notEmpty();
//   var errors = req.validationErrors();

//   if (errors) {
//     console.log("errors");
//   } else {
//     var new_checkIn = {
//       contract_number: 001,
//       reservation_source: null,
//       rent_type: null,
//       days: 1,
//       room: null,
//       customer: null,
//       notes: ""
//     };
//     console.log("sucess");
//   }
// });

router.post("/addingRoom", function(req, res) {
  req.checkBody("name", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  } else {
    MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      dbo = db.db(dbName);
      var newRoom = {
        roomNumber: req.body.name,
        floor: req.body.floor,
        dailyPrice: 100,
        peakPrice: 150,
        status: req.body.status,
        GeneralFeatures: [
          {
            internet: req.body.internet ? true : false,
            parking: req.body.parking ? true : false,
            elevator: req.body.elevator ? true : false,
            cleaning: req.body.cleaning ? true : false
          }
        ],
        SpecialFeatures: [
          {
            phoneguide: req.body.phoneguide ? true : false,
            oven: req.body.oven ? true : false,
            paper: req.body.paper ? true : false,
            microwave: req.body.microwave ? true : false,
            elevator: req.body.elevator ? true : false,
            qiblah: req.body.qiblah ? true : false,
            restaurantslist: req.body.restaurantslist ? true : false,
            iron: req.body.iron ? true : false,
            refrigerator: req.body.refrigerator ? true : false,
            foodtable: req.body.foodtable ? true : false,
            hall: req.body.hall ? true : false,
            kitchen: req.body.kitchen ? true : false
          }
        ],
        notes: req.body.notes
      };
      dbo.collection("rooms").save(newRoom, (err, result) => {
        if (err) {
          throw err;
        }
        res.redirect("/ManageFreeBookings");
        db.close();
      });
      console.log("Inserted");
    });
  }
});

module.exports = router;
