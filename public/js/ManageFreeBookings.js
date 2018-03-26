var frmCheckIn = $("#frmCheckIn");
var frmAddingRoom = $("#frmAddingRoom");
var frmUpdateRoom = $("#frmUpdateRoom");
// var modelAddRoom = $("#modelAddRoom");

// $("#btnAddRoom").on('click', () => {
//   frmAddingRoom.submit();
// })
// modelAddRoom.on("change",() =>{
//   if ($(this).attr("aria-hidden") == "true") {
//     frmAddingRoom.get(0).reset();
//   }
// })
$(".formClose").on("click", () => {
  frmAddingRoom.get(0).reset();
});

// var logIn_dialog = $("#modelCheckIn").dialog({
//   title: "تسجيل دخول",
//   autoOpen: false,
//   draggable: false,
//   width: "70vw",
//   show: {
//     effect: "fade",
//     duration: 500
//   },
//   hide: {
//     effect: "Transfer",
//     duration: 200
//   },
//   modal: true,
//   buttons: [
//     {
//       text: "حفظ",
//       class: "mybtn-dialog mybtn-dialog-save",
//     //   type: "submit",
//     //   form: "frmCheckIn",
//       click: () => {
//         frmCheckIn.submit();
//       }
//     },
//     {
//       text: "الغاء الأمر",
//       class: "mybtn-dialog mybtn-dialog-save",
//       click: () => {
//         logIn_dialog.dialog("close");
//       }
//     }
//   ],
//   close: function() {
//     //  form[0].reset();
//     //   allFields.removeClass( "ui-state-error" );
//   }
// });

$(".btn-room-checkIn").click(function() {
  frmCheckIn.get(0).reset();
  var target = $(event.target);
  if (target.is("div")) {
    var id = target.data()._id;
  } else {
    var id = target.parent().data()._id;
  }
  $.ajax({
    url: "/managefreebookings/room/" + id,
    beforeSend: function() {
      $("#modelCheckIn")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
      frmCheckIn.toggleClass("hidden");
      frmCheckIn.removeClass("showen");
    },
    success: function(result) {
      var room = result[0];
      for (var prop in room) {
        if (prop == "roomNumber" || prop == "dailyPrice" || prop == "peakPrice" ) {
          input = frmCheckIn.find("label[name='" + prop + "']");
          input.text(":" + room[prop])
        }      
      }
      frmCheckIn.toggleClass("hidden");
      frmCheckIn.addClass("showen");
      $("#modelCheckIn")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
    }
  });
  
  // $("#lbl_roomNumber").text(":" + $(this).data().roomnumber);
  // $("#lbl_dailyPrice").text(":" + $(this).data().dailyprice);
  // $("#lbl_peakPrice").text(":" + $(this).data().peakprice);
});

$(".btn-room-update").click(event => {
  frmUpdateRoom.get(0).reset();
  var target = $(event.target);
  if (target.is("div")) {
    var id = target.data()._id;
  } else {
    var id = target.parent().data()._id;
  }

  // JQuary Ajax
  $.ajax({
    url: "/managefreebookings/room/" + id,
    beforeSend: function() {
      $("#updateRoomModal")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
      $("#frmUpdateRoom").toggleClass("hidden");
      $("#frmUpdateRoom").removeClass("showen");
    },
    success: function(result) {
      var room = result[0];
      $(frmUpdateRoom).attr(
        "action",
        "/ManageFreeBookings/updateRoom/" + room._id
      );
      for (var prop in room) {
        if (prop != "_id") {
          input = $("#frmUpdateRoom").find("input[name='" + prop + "']");
          if (input.attr("type") == "text") {
            input.val(room[prop]);
          }
          if (prop == "GeneralFeatures") {
            // if (input.attr("type") == "checkbox") {
            for (var pro in room[prop][0]) {
              input = $("#frmUpdateRoom").find("input[name='" + pro + "']");
              input.attr("checked", room[prop][0][pro]);
              // }
            }
          }
          if (prop == "SpecialFeatures") {
            for (var pro in room[prop][0]) {
              input = $("#frmUpdateRoom").find("input[name='" + pro + "']");
              input.attr("checked", room[prop][0][pro]);
            }
          }
          $("#frmUpdateRoom")
            .find("select[name='" + prop + "']")
            .val(room[prop]);

          // alert(room[prop][0]["internet"]);
        }
      }
      $("#frmUpdateRoom").toggleClass("hidden");
      $("#frmUpdateRoom").addClass("showen");
      $("#updateRoomModal")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
    }
  });

  // JavaScript Ajax
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     obj = JSON.parse(this.responseText);
  //     var room = obj[0];
  //     alert(room._id);

  //   }
  // };
  // xhttp.open("GET", "/managefreebookings/room/" + id, true);
  // xhttp.send();
});

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "//public/products.json",
      dataType: "jsonp"
    }
  }
});

// $(".combobox").kendoComboBox();
// $('#datetimepicker1').datetimepicker();
// $('.datePicker').datepicker({format: "dd.mm.yyyy"});
$("#bookingSrc").kendoComboBox({
  placeholder: "اختر مصدر الحجز",
  // dataTextField: "ProductName",
  // dataValueField: "ProductID",
  filter: "contains",
  suggest: true,
  index: 1
});

var select = $("#bookingSrc").data("kendoComboBox");
/*====================================================================End of ComboBox Jquary */
$(".sandbox-container input").datepicker({
  weekStart: 6,
  maxViewMode: 3,
  todayBtn: "linked",
  language: "ar",
  orientation: "bottom left",
  todayHighlight: true
});

