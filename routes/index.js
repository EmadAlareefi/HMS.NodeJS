var express = require("express");
var router = express.Router();
var mongo = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/", (req, res, next) => {
  MongoClient.connect(globals.url, (err, db) => {
    if (err) throw err;

    dbo = db.db(globals.dbName);
    dbo
    .collection("rooms")
    .find({})
    .toArray((err, rooms) => {
      if (err) {
        res.send(err);
      }
      res.render("index", {
        title: "الرئيسية",
        Page: {
          title: "الرئيسية"
        },
        rooms
      });
    });
  });
});

//Create Database in the local mongoDB //
router.get("/createDB/:dbname/:collection", (req, res, next) => {
  if (req.params.dbname) {
    url = "mongodb://localhost:27017/" + req.params.dbname + "";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database " + req.params.dbname + " Created");
      var dbo = db.db(req.params.dbname);
      dbo.createCollection(req.params.collection, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
      });
      res.send("Database " + req.params.dbname + " Created");
    });
  }
});

router.get("/dropDB/:dbname", (req, res, next) => {
  if (req.params.dbname) {
    url = "mongodb://localhost:27017/" + req.params.dbname + "";
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db(req.params.dbname);
      dbo.dropDatabase();
      res.send("Database " + req.params.dbname + " Deleted!");
    });
  }
});

//========Needs plan upgrade============//
// router.get('/createDB/:dbname', (req,res,next) => {
//     if(req.params.dbname){
//         mongojs("mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/"+ req.params.dbname +"?authSource=admin$replicaSet=rs-ds255588");
//         url = "mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/"+ req.params.dbname +"";
//         MongoClient.connect(url, function(err, db) {
//             if (err) throw err;
//             console.log('Database ' + req.params.dbname + ' Created');
//             db.close();
//           });
//     }

// });

module.exports = router;
