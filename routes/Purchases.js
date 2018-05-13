var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
    res.render("Pages/Purchases", {
        title: "المشتريات",
        Page: {
          title: "المشتريات"
        },
        Purchases: []
      });
      console.log("Error connecting the database" + err);
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("Purchases")
        .find({})
        .toArray((err, Purchases) => {
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
              res.render("Pages/Purchases", {
                title: "إدارة المشتريات",
                Page: {
                  title: "إدارة المشتريات"
                },
                Purchases,
                settings
              });
            });
        });
    }
  });
});
 



router.post("/addPurchase", (req, res, next) => {
  var body = req.body;
  var PurchaseNumber = body.PurchaseNumber;
  var PurchaseName = body.PurchaseName;
  var PurchaseType = body.PurchaseType;
  var Amount = body.Amount;
  var PurchasePrice= body.PurchasePrice;
  var Total= body.PurchasePrice*Amount;






  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);
    var new_Purchase = {
      PurchaseNumber: PurchaseNumber,
      PurchaseName: PurchaseName,
      PurchaseType: PurchaseType,
      Amount: Amount,
      PurchasePrice: PurchasePrice,
      Total: Total,


      
    };

    dbo.collection("Purchases").save(new_Purchase, (err, result) => {
      if (err) throw err;
      res.redirect("/Purchases");
      // res.end();
      db.close();

    });
  });
});


module.exports = router;
