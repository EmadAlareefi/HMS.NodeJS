var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;

// var db = mongojs('mongodb://EmadAlareefi:emadalareefi@ds255588.mlab.com:55588/hmsdb', ['bookingTypes']);
var db = mongojs('mongodb://localhost:27017/hmsdb', ['bookingTypes']);


router.get('/', function (req, res, next) {
        db.bookingTypes.find((err, bookingTypes) => {
            if (err) {
                res.send(err);
            }
            var typesOfBooking = bookingTypes[0];

            res.render('Pages/Management/ManageFreeBookings', {
                title: 'الشقق والتسكين',
                Page: {
                    title: "الشقق والتسكين"
                },
                typesOfBooking

            });

        });
    });
    

router.get('/typesOfBookings', function (req, res, next) {
    // var typesOfBookings = {
    //    "1":"عن طريق الموقع",
    //    "2":"خارجي",
    //    "3":"الاستقبال"          
    // }

    db.bookingTypes.find((err, bookingTypes) => {
        if (err) {
            res.send(err);
        }
        for (var key in bookingTypes[0]) {
            if (key != '_id') {
                console.log(bookingTypes[0][key]);
            }
        }
        // console.log(bookingTypes);
        res.json(bookingTypes);
    });
});


module.exports = router;