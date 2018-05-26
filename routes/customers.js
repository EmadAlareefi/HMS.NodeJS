const {
  check,
  validationResult
} = require("express-validator/check");
const {
  matchedData,
  sanitize
} = require("express-validator/filter");

var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");
var ObjectId = require("mongodb").ObjectId;


router.get("/", globals.ensureAuthenticated, (req, res, next) => {
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

// router.post(
//   "/addCustomer",
//   [
//     check('firstName')
//     // Every validator method in the validator lib is available as a
//     // method in the check() APIs.
//     // You can customize per validator messages with .withMessage()
//     .equals("").withMessage("لا بد من اضافة الاسم الثاني"),
//     check('secondName',"لا بد من اضافة الاسم الثاني")
//     // Every validator method in the validator lib is available as a
//     // method in the check() APIs.
//     // You can customize per validator messages with .withMessage()
//     .exists(),
//   ]
//   ,
//   (req, res, next) => {
//     var body = req.body;
//     var firstName = body.firstName;
//     var secondName = body.secondName;
//     var thirdName = body.thirdName;
//     var lastName = body.lastName;
//     var customerType = body.customerType;
//     var nationality = body.nationality;
//     var idType = body.idType;
//     var cardCopyNum = body.cardCopyNum;
//     var idNum = body.idNum;
//     var issuingPlace = body.issuingPlace;
//     var expDate = body.expDate;
//     var phone = body.phone;
//     var workPhone = body.workPhone;
//     var email = body.email;
//     var category = body.category;
//     var address = body.address;
//     var specialNotes = body.specialNotes;
//     var notes = body.notes;

// req.checkBody("firstName", "لا بد من اضافة الاسم الأول").notEmpty();
// req.checkBody("secondName", "لا بد من اضافة الاسم الثاني").notEmpty();
// req.checkBody("thirdName", "لا بد من اضافة الاسم الثالث").notEmpty();
// req.checkBody("lastName", "لا بد من اضافة الاسم اللقب").notEmpty();
// req.checkBody("customerType", "لا بد من اختيار نوع العميل").equals("اختر");
// req.checkBody("nationality", "لا بد من اضافة جنسية العميل").notEmpty();
// req.checkBody("roomNumber", "ﻻ ﺑﺪ ﻣﻦ اﺿﺎﻓﺔ اسم الغرفة").notEmpty();
// req.checkBody("floor", "لا بد من اضافة رقم الطابق").notEmpty();

router.post("/addCustomer/:customer", (req, res, next) => {

  strCustomer = req.params.customer;
  customer = JSON.parse(strCustomer);

  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);

    var currentTime = new Date();
    var year = currentTime.getFullYear();

    dbo
      .collection("accounts")
      .find()
      .limit(1)
      .sort({
        $natural: -1
      })
      .toArray(function (err, account) {
        if (err) throw err;
        if (account[0]) {
          console.log(getAccountByidNum(customer.idNum));

          var newNum = account[0].accountNumber.substr(4);

          var new_account = {
            accountNumber: year + (parseInt(newNum) + 1).toString(),
            accountName: customer.firstName + " " + customer.secondName + " " + customer.thirdName + " " + customer.lastName,
            idNum: customer.idNum,
            balance: 0
          };
        } else {
          var new_account = {
            accountNumber: year + "10001",
            accountName: customer.firstName + " " + customer.secondName + " " + customer.thirdName + " " + customer.lastName,
            idNum: customer.idNum,
            balance: 0
          };
        }

        dbo.collection("customers").save(customer, (err, result) => {
          if (err) throw err;
          dbo.collection("accounts").save(new_account, (err, result) => {
            if (err) throw err;

            // res.end();
            db.close();
            res.send("true");
          });
        });
      });
  });
});

router.get("/getAccount/:idNum", (req, res, next) => {
  idNum = req.params.idNum;
  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;
    dbo = db.db(globals.dbName);
    dbo.collection("accounts").find({
      idNum: idNum
    }).toArray((err, account) => {
      if (err) res.send(err);
      // console.log(room);
      // res.send(id = o_id);
      console.log(account[0].accountNumber);
      res.json(account);
    });
  });
});


function getAccountByidNum(id) {
  
}
module.exports = router;