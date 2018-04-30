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

router.get("/", function(req, res, next) {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("Pages/ManageFreeBookings", {
        title: "الشقق والتسكين",
        Page: {
          title: "الشقق والتسكين"
        },
        rooms: [],
        emptyRooms: [],
        usedRooms: [],
        settings: []
      });
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("rooms")
        .find({})
        .toArray((err, rooms) => {
          if (err) {
            res.send(err);
          }
          dbo
            .collection("rooms")
            .find({ status: "فارغة" })
            .toArray((err, emptyRooms) => {
              if (err) {
                res.send(err);
              }
              dbo
                .collection("rooms")
                .find({ status: "مؤجرة" })
                .toArray((err, usedRooms) => {
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
                      res.render("Pages/ManageFreeBookings", {
                        title: "الشقق والتسكين",
                        Page: {
                          title: "الشقق والتسكين"
                        },
                        rooms,
                        emptyRooms,
                        usedRooms,
                        settings
                      });
                    });
                });
            });
        });
    }
  });
});

router.post("/checkIn", (req, res, next) => {
  var body = req.body;
  console.log(body);


  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);
    var new_checkIn = {
      contractNum: body.contractNum,
      referenceID: "",
      roomNumber: body.roomNumber,
      customer: body.customer,
      bookingType: body.bookingType,
      bookingSrc: body.bookingSrc,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
      period: body.daysNum,
      dailyPrice: body.dailyPrice,
      finalPrice: body.finalPrice,
      taxes: "",
      total: body.total,
      paidAmount: 0,
      creditor: "",
      debtor: "",
      notes: body.notes
    };

    dbo.collection("checkIns").save(new_checkIn, (err, result) => {
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

router.post("/addingRoom", function(req, res,next) {
  req.checkBody("roomNumber", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    // alert(errors);
    console.log(errors);
    return res.end();
  } else {
    MongoClient.connect(globals.url, (err, db) => {
      if (err) throw err;
      dbo = db.db(globals.dbName);
      var newRoom = {
        roomNumber: req.body.roomNumber,
        floor: req.body.floor,
        roomsNumber: req.body.roomsNumber,
        bathrooms: req.body.bathrooms,
        singleBeds: req.body.singleBeds,
        doubleBeds: req.body.doubleBeds,
        closets: req.body.closets,
        tvs: req.body.tvs,
        acType: req.body.acType,
        roomType: req.body.roomType,
        dailyPrice: req.body.dailyPrice,
        peakPrice: req.body.peakPrice,
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
            washer: req.body.washer ? true : false,
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
    });
  }
});

router.post("/updateRoom/:id", function(req, res) {
  req.checkBody("roomNumber", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
  } else {
    MongoClient.connect(globals.url, (err, db) => {
      if (err) throw err;
      dbo = db.db(globals.dbName);
      var newRoom = {
        roomNumber: req.body.roomNumber,
        floor: req.body.floor,
        roomsNumber: req.body.roomsNumber,
        bathrooms: req.body.bathrooms,
        singleBeds: req.body.singleBeds,
        doubleBeds: req.body.doubleBeds,
        closets: req.body.closets,
        tvs: req.body.tvs,
        acType: req.body.acType,
        roomType: req.body.roomType,
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
            washer: req.body.washer ? true : false,
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
      var o_id = new ObjectId(req.params.id);
      dbo.collection("rooms").update({ _id: o_id }, newRoom, (err, result) => {
        if (err) {
          throw err;
        }
        res.redirect("/ManageFreeBookings");
        db.close();
      });
    });
  }
});

router.get("/room/:id", function(req, res) {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) res.send(err);
    dbo = db.db(globals.dbName);
    var o_id = new ObjectId(req.params.id);

    dbo
      .collection("rooms")
      .find({ _id: o_id })
      .toArray((err, room) => {
        if (err) res.send(err);
        // console.log(room);
        // res.send(id = o_id);
        res.json(room);
      });
  });
});
module.exports = router;
