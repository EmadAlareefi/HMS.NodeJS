var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/", (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("Pages/customers", {
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
          dbo
          .collection("settings")
          .find({})
          .toArray((err, settings) => {
            if (err) {
              res.send(err);
            }
          res.render("Pages/customers", {
            title: "إدارة العملاء",
            Page: {
              title: "إدارة العملاء"
            },
            customers,
            settings
          });
        });
        });
    }
  });
  
});

router.post("/addCustomer", (req, res, next) => {
  var body = req.body;

  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);
    var new_customer = {
      firstName: body.firstName,
      secondName: body.secondName,
      thirdName: body.thirdName,
      lastName: body.lastName,
      customerType: body.customerType,
      nationality: body.nationality,
      idType: body.idType,
      cardCopyNum: body.cardCopyNum,
      idNum: body.idNum,
      issuingPlace: body.issuingPlace,
      expDate: body.expDate,
      phone: body.phone,
      workPhone: body.workPhone,
      email: body.email,
      category: body.category,
      address: body.address,
      specialNotes: body.specialNotes,
      notes: body.notes,
    };

    dbo.collection("customers").save(new_customer, (err, result) => {
      if (err) throw err;
      // res.redirect("/ManageFreeBookings");
      // res.end();
      db.close();
    });
  });
});

module.exports = router;
