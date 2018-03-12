var express = require("express");
const { check, validationResult } = require("express-validator/check");
const { matchedData, sanitize } = require("express-validator/filter");
var router = express.Router();
var mongojs = require("mongojs");
var MongoClient = require("mongodb").MongoClient;

// var url = 'mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb';
// var db = mongojs('mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb', ['bookingTypes']);
var url = "mongodb://localhost:27017/";
var dbName = "hmsdb";
var db = mongojs(url + dbName, ["bookingSrc"]);

router.get("/", function(req, res, next) {
  db.bookingSrc.find((err, bookingSrc) => {
    if (err) {
      res.send(err);
    }
    db.bookingTypes.find((err, bookingTypes) => {
      if (err) {
        res.send(err);
      }
      db.rooms.find((err, rooms) => {
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
          rooms
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

router.post("/check_in", function(req, res) {
  req.checkBody("contract-number", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ ﺭﻗﻢ اﻟﻌﻘﺪ").notEmpty();
  var errors = req.validationErrors();

  if (errors) {
    console.log("errors");
  } else {
    var new_checkIn = {
      contract_number: 001,
      reservation_source: null,
      rent_type: null,
      days: 1,
      room: null,
      customer: null,
      notes: ""
    };
    console.log("sucess");
  }
});

router.post("/addingRoom", function(req, res) {
  req.checkBody("name", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  } else {
    dbo = db.db(dbName);
    var newRoom = {
      name: body.name,
      floor: body.floor,
      bookingSrc: body.bookingSrc,
      GeneralFeatures: [
        {
          internet: body.internet,
          parking: body.parking,
          elevator: body.elevator,
          cleaning: body.cleaning
        }
      ],
      SpecialFeatures: [
        {
          phoneguide: body.phoneguide,
          oven: body.oven,
          paper: body.paper,
          microwave: body.microwave,
          elevator: body.elevator,
          qiblah: body.qiblah,
          restaurantslist: body.restaurantslist,
          iron: body.iron,
          refrigerator: body.refrigerator,
          foodtable: body.foodtable,
          hall: body.hall,
          kitchen: body.kitchen
        }
      ],
      notes: body.notes
    };
    dbo.collection("rooms").save(newRoom, (err, result) => {
      if (err) {
        throw err;
        return false;
      }
      res.redirect("/ManageFreeBookings");
      dbo.close();
    });
    console.log("Inserted");
  }
});

module.exports = router;
