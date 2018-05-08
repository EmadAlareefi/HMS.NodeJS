var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var globals = require("./globals");

router.get("/", (req, res, next) => {
    res.render("login", {
        title: "تسجيل الدخول",
        Page: {
          title: "تسجيل الدخول"
        }
      });
});


router.post("/validate", (req, res, next) => {
  res.redirect("../");
});

module.exports = router;
