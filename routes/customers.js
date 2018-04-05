var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/", (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("Pages/Management/customers", {
        title: "إدارة العملاء",
        Page: {
          title: "إدارة العملاء"
        },
        customers:[]
      });
      console.log("Error connecting the database" + err);
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("customers")
        .find({})
        .toArray((err, customers) => {
          if (err) {
            console.log("Error connecting the database" + err);
          }
          res.render("Pages/Management/customers", {
            title: "إدارة العملاء",
            Page: {
              title: "إدارة العملاء"
            },
            customers
          });
        });
    }
  });
});

router.post("/addCustomer", function(req, res) {
  // req.checkBody("roomNumber", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  // req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
  } else {
    MongoClient.connect(globals.url, (err, db) => {
      if (err) throw err;
      dbo = db.db(globals.dbName);
      var newCustomer = {
        id:1
      };
      dbo.collection("customers").save(newCustomer, (err, result) => {
        if (err) {
          throw err;
        }
        // res.redirect("/ManageFreeBookings");
        db.close();
        res.end();
      });
    });
  }
});

module.exports = router;
