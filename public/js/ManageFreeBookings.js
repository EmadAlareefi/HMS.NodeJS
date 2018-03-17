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

$(".btn-room").click(function() {
  id = $(this).data()._id;
  $.ajax({
    url: "/managefreebookings/room/" + id,
    success: function(result) {
      var room = result[0];
      $("#lbl_roomNumber").text(":" + room.roomNumber);
      $("#lbl_dailyPrice").text(":" + room.dailyPrice);
      $("#lbl_peakPrice").text(":" + room.peakPrice);
    }
  });
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

$("a[data-target='#updateRoomModal']").click(event => {
  frmUpdateRoom.get(0).reset();
  var target = $(event.target);
  if (target.is("div")) {
    var id = target.data()._id;
  } else {
    var id = target.parent().data()._id;
  }
  $.ajax({
    url: "/managefreebookings/room/" + id,
    success: function(result) {
      var room = result[0];
      alert(room._id);
    }
  });
});
// $(".btn-room")
