var express = require("express");
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

 

  
  //   MongoClient.connect(url, (err, db) => {
  //     var bookingSrc = [];
  //     var bookingTypes = [];

  //     if (err) throw err;
  //     dbo = db.db(dbName);
  //     dbo.collection("bookingSrc").find((err, result) => {
  //       if (err) throw err;
  //       bookingSrc = result;
  //       console.log(result);
  //     });
  //     console.log(bookingSrc);

  //     dbo.collection("bookingTypes").find((err, result) => {
  //       if (err) throw err;
  //       bookingTypes = result;
  //       console.log(result);
  //     });
  //     console.log(bookingTypes);

  //     res.render("Pages/Management/ManageFreeBookings", {
  //       title: "الشقق والتسكين",
  //       Page: {
  //         title: "الشقق والتسكين"
  //       },
  //       bookingSrc: [],
  //       bookingTypes: []
  //     });
  //   });
});

// router.get("/typesOfBookings", function(req, res, next) {
//   // var typesOfBookings = {
//   //    "1":"عن طريق الموقع",
//   //    "2":"خارجي",
//   //    "3":"الاستقبال"
//   // }
//   db.bookingSrc.find((err, bookingSrc) => {
//     if (err) {
//       res.send(err);
//     }
//     // for (var obj in bookingTypes) {
//     //         console.log(obj[1].type);
//     // }
//     // console.log(bookingTypes);

//     bookingSrc.forEach(element => {
//       console.log(element.type);
//     });
//     res.json(bookingSrc);
//   });
// });

router.post("/checkIn", (req, res, net) => {
  var checkIn = req.body;
  console.log(req.body);

  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    dbo = db.db(dbName);
    dbo.collection("checkIns").save(checkIn, (err, result) => {
      if (err) throw err;
      console.log(checkIn);
      console.log("1 document inserted");
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
    var new_resedent = {
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
    
});


module.exports = router;
