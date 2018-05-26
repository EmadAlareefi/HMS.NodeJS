var express = require("express");
const {
  check,
  validationResult
} = require("express-validator/check");
const {
  matchedData,
  sanitize
} = require("express-validator/filter");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");
var ObjectId = require("mongodb").ObjectId;


router.get("/",globals.ensureAuthenticated, (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) {
    res.render("Pages/Services", {
        title: "الخدمات",
        Page: {
          title: "الخدمات"
        },
        services: []
      });
      console.log("Error connecting the database" + err);
    } else {
      dbo = db.db(globals.dbName);
      dbo
        .collection("services")
        .find({})
        .toArray((err, services) => {
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
              res.render("Pages/Services", {
                title: "إدارة الخدمات",
                Page: {
                  title: "إدارة الخدمات"
                },
                services,
                settings
              });
            });
        });
    }
  });
});
 



router.post("/addService", (req, res, next) => {
  var body = req.body;
  var serviceNumber = body.serviceNumber;
  var serviceName = body.serviceName;
  var serviceType = body.serviceType;
  var servicePrice= body.servicePrice;




  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);
    var new_service = {
      serviceNumber: serviceNumber,
      serviceName: serviceName,
      serviceType: serviceType,
      servicePrice: servicePrice,
      
    };

    dbo.collection("services").save(new_service, (err, result) => {
      if (err) throw err;
      res.redirect("/Services");
      // res.end();
      db.close();

    });
  });
});


router.post("/updateService/:id", function (req, res) {
  var body = req.body;
  var serviceNumber = body.serviceNumber;
  var serviceName = body.serviceName;
  var serviceType = body.serviceType;
  var servicePrice= body.servicePrice;
   
    MongoClient.connect(globals.url, (err, db) => {
      if (err) throw err;
      dbo = db.db(globals.dbName);
      var new_service = {
        serviceNumber: serviceNumber,
        serviceName: serviceName,
        serviceType: serviceType,
        servicePrice: servicePrice,
      };
      var o_id = new ObjectId(req.params.id);
      dbo.collection("services").update({
        _id: o_id
      }, new_service, (err, result) => {
        if (err) {
          throw err;
        }
        res.redirect("/Services");
        db.close();
      });
    });
});


router.get("/service/:id", globals.ensureAuthenticated, function (req, res) {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) res.send(err);
    dbo = db.db(globals.dbName);
    var o_id = new ObjectId(req.params.id);

    dbo
      .collection("services")
      .find({
        _id: o_id
      })
      .toArray((err, service) => {
        if (err) res.send(err);
        // console.log(room);
        // res.send(id = o_id);
        res.json(service);
      });
  });
});
module.exports = router;
