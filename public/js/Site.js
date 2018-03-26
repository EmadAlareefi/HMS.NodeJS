$(window).on("load",function() {
  $(".loadingScreen").fadeOut("slow");
});

$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
  });

  $("#btn_adding_a_room").on("click", () =>{
  });

  $("#btnManageRooms").on("click", () =>{
    if(window.location.pathname == "/ManageFreeBookings"){
      $("#manageRooms-tab").addClass("active show" , () => {
        $("#manageRooms-tab").attr("aria-selected","true");
        $("#manageRooms").addClass("active show");
      });
      $("#checkIn-tab").removeClass("active show" , () => {
        $("#checkIn-tab").attr("aria-selected","false");
        $("#checkIn").removeClass("active show");

      });
      $("#checkOut-tab").removeClass("active show" , () => {
        $("#checkOut-tab").attr("aria-selected","false");
        $("#checkOut").removeClass("active show");
      });
    } else {
      window.location.pathname = "/ManageFreeBookings";
      $("#manageRooms-tab").addClass("active show" , () => {
        $("#manageRooms-tab").attr("aria-selected","true");
        $("#manageRooms").addClass("active show");
      });
    }    
  });

  $("#btnCheckIn").on("click", () =>{

    if(window.location.pathname == "/ManageFreeBookings"){
      $("#checkIn-tab").addClass("active show" , () => {
        $("#checkIn-tab").attr("aria-selected","true");
        $("#checkIn").addClass("active show");
      });
      $("#manageRooms-tab").removeClass("active show" , () => {
        $("#manageRooms-tab").attr("aria-selected","false");
        $("#manageRooms").removeClass("active show");

      });
      $("#checkOut-tab").removeClass("active show" , () => {
        $("#checkOut-tab").attr("aria-selected","false");
        $("#checkOut").removeClass("active show");
      });
    } else {
      window.location.pathname = "/ManageFreeBookings";
      $("#checkIn-tab").addClass("active show" , () => {
        $("#checkIn-tab").attr("aria-selected","true");
        $("#checkIn").addClass("active show");
      });
    }  
  });

  $("#btnCheckOut").on("click", () =>{

    if(window.location.pathname == "/ManageFreeBookings"){
      $("#checkOut-tab").addClass("active show" , () => {
        $("#checkOut-tab").attr("aria-selected","true");
        $("#checkOut").addClass("active show");
      });
      $("#manageRooms-tab").removeClass("active show" , () => {
        $("#manageRooms-tab").attr("aria-selected","false");
        $("#manageRooms").removeClass("active show");

      });
      $("#checkIn-tab").removeClass("active show" , () => {
        $("#checkIn-tab").attr("aria-selected","false");
        $("#checkIn").removeClass("active show");
      });
    } else {
      window.location.pathname = "/ManageFreeBookings";
        $("#checkOut-tab").addClass("active show" , () => {
          $("#checkOut-tab").attr("aria-selected","true");
          $("#checkOut").addClass("active show");
        });
    }  
  });
  

  // $('#modelAddRoom').on('shown.bs.modal', function () {
  //   $('#myInput').trigger('focus')
  // })
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
window.addEventListener("load", function() {
  var wifi = document.getElementById("nav_wifi_icon");
  var log = document.getElementById("log");

  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? "online" : "offline";

    wifi.className = condition;
    if (condition == "online") {
      wifi.firstElementChild.setAttribute("aria-label", "متصل");
    } else {
      wifi.firstElementChild.setAttribute("aria-label", "غير متصل");
    }
  }
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});
