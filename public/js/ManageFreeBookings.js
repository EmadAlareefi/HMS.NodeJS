
var frmCheckIn = $("#frmCheckIn");
var frmAddingRoom = $("#frmAddingRoom");
// var modelAddRoom = $("#modelAddRoom");


// $("#btnAddRoom").on('click', () => {
//   frmAddingRoom.submit();
// })
// modelAddRoom.on("change",() =>{
//   if ($(this).attr("aria-hidden") == "true") {
//     frmAddingRoom.get(0).reset();
//   }
// })
$(".formClose").on('click', () => {
  frmAddingRoom.get(0).reset();
})


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
  $("#lbl_roomNumber").text(":" + $(this).attr("data-roomnumber"));
  $("#lbl_dailyPrice").text(":" + $(this).attr("data-dailyPrice"));
  $("#lbl_peakPrice").text(":" + $(this).attr("data-peakPrice"));
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
