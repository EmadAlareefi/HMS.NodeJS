var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/",globals.ensureAuthenticated, (req, res, next) => {
    res.render("Pages/Management/", {
        title: "",
        Page: {
          title: ""
        }
      });
});

module.exports = router;
