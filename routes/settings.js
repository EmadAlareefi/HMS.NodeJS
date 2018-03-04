var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;




router.get('/',(req,res,next) => {

    res.render('Pages/settings', {
        title: "الإعدادات",
        Page: {
            title: "الإعدادات"
        }       
    });

})





module.exports = router;