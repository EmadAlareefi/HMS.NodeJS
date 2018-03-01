$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');


    });

});


// setTimeout(function a() {
//     Offline.check();
//     Offline.on('down', function() {
//         $(".top-nav a span[aria-label='متصل']").css("color", "red");
//     });
//     Offline.on('up', function() {
//         $(".top-nav a span[aria-label='متصل']").css("color", "green");
//     });
// setTimeout(a, 10000);
// }, 10000);
// checkInternet(function(isConnected) {
//     if (isConnected) {
//         alert("ok");
//          $(".top-nav a span[aria-label='متصل']").css("color", "green");
// } else {
//     alert("not ok");
//          $(".top-nav a span[aria-label='متصل']").css("color", "red");
// }
// });

// function checkInternet(cb) {
//     require('dns').lookup('google.com',function(err) {
//         if (err && err.code == "ENOTFOUND") {
//             cb(false);
//         } else {
//             cb(true);
//         }
//     })
// }


// Check internet connection
window.addEventListener('load', function () {
    var wifi = document.getElementById("nav_wifi_icon");
    var log = document.getElementById("log");

    function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";

        wifi.className = condition;
        if (condition == "online") {
            wifi.firstElementChild.setAttribute("aria-label", "متصل")

        } else {
            wifi.firstElementChild.setAttribute("aria-label", "غير متصل")
        }
    }
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});