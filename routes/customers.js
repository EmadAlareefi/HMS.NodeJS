var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
      res.render("Pages/customers", {
        title: "إدارة العملاء",
        Page: {
          title: "إدارة العملاء"
        },
        customers: []
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
  var firstName = firstName;
  var secondName = body.secondName;
  var thirdName = body.thirdName;
  var lastName = body.lastName;
  var customerType = body.customerType;
  var nationality = body.nationality;
  var idType = body.idType;
  var cardCopyNum = body.cardCopyNum;
  var idNum = body.idNum;
  var issuingPlace = body.issuingPlace;
  var expDate = body.expDate;
  var phone = body.phone;
  var workPhone = body.workPhone;
  var email = body.email;
  var category = body.category;
  var address = body.address;
  var specialNotes = body.specialNotes;
  var notes = body.notes;

  req.checkBody("firstName", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("secondName", "لا بد من اضافة رقم الطابق").notEmpty();
  req.checkBody("thirdName", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  req.checkBody("lastName", "لا بد من اضافة رقم الطابق").notEmpty();
  req.checkBody("customerType", "لا بد من اختيار نوع العميل").equals("");
  // req.checkBody("nationality", "لا بد من اضافة جنسية العميل").notEmpty();
  // req.checkBody("roomNumber", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
  // req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.redirect("/ManageFreeBookings");
  } else {
    MongoClient.connect(globals.url, (err, db) => {
      if (err) throw err;

      dbo = db.db(globals.dbName);
      var new_customer = {
        firstName: firstName,
        secondName: secondName,
        thirdName: thirdName,
        lastName: lastName,
        customerType: customerType,
        nationality: nationality,
        idType: idType,
        cardCopyNum: cardCopyNum,
        idNum: idNum,
        issuingPlace: issuingPlace,
        expDate: expDate,
        phone: phone,
        workPhone: workPhone,
        email: email,
        category: category,
        address: address,
        specialNotes: specialNotes,
        notes: notes
      };

      dbo.collection("customers").save(new_customer, (err, result) => {
        if (err) throw err;
        res.redirect("/ManageFreeBookings");
        // res.end();
        db.close();
      });
    });
  }
});

module.exports = router;
