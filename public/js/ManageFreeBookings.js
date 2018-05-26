var frmCheckIn = $("#frmCheckIn");
var frmAddingRoom = $("#frmAddingRoom");
var frmUpdateRoom = $("#frmUpdateRoom");
var frmCreateCustomer = $("#frmCreateCustomer");
var createCustomerModal = $("#createCustomerModal");
var btnCreateCustomerClose = $("#btnCreateCustomerClose");
var searchCustomerModal = $("#searchCustomerModal");
var btnSearchCustomerModal = $("#btnSearchCustomerModal");
var searchCustomerModal = $("#searchCustomerModal");
var searchCustomermodalBody = $("#searchCustomerModal").find(".modal-body");

(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .combobox");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (customerValidate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }
    return check;
  });

  $(".validate-form .combobox").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function customerValidate(input) {
    // if (
    //   $(input).attr("type") == "firstName" ||
    //   $(input).attr("name") == "firstName"
    // ) {
    //   if (
    //     $(input)
    //       .val()
    //       .trim()
    //       .match(
    //         /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
    //       ) == null
    //   ) {
    //     return false;
    //   }
    // } else {
    if (
      $(input)
      .val()
      .trim() == ""
    ) {
      return false;
    }
  }
  // }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }


})(jQuery);


frmCreateCustomer.on("submit", function (e) {
  e.preventDefault();

  var customer = {
    firstName: frmCreateCustomer.find("[name*='firstName']").val(),
    secondName: frmCreateCustomer.find("[name*='secondName']").val(),
    thirdName: frmCreateCustomer.find("[name*='thirdName']").val(),
    lastName: frmCreateCustomer.find("[name*='lastName']").val(),
    customerType: frmCreateCustomer.find("[name*='customerType']").val(),
    nationality: frmCreateCustomer.find("[name*='nationality']").val(),
    idType: frmCreateCustomer.find("[name*='idType']").val(),
    cardCopyNum: frmCreateCustomer.find("[name*='cardCopyNum']").val(),
    idNum: frmCreateCustomer.find("[name*='idNum']").val(),
    issuingPlace: frmCreateCustomer.find("[name*='issuingPlace']").val(),
    expDate: frmCreateCustomer.find("[name*='expDate']").val(),
    phone: frmCreateCustomer.find("[name*='phone']").val(),
    workPhone: frmCreateCustomer.find("[name*='workPhone']").val(),
    email: frmCreateCustomer.find("[name*='email']").val(),
    category: frmCreateCustomer.find("[name*='category']").val(),
    address: frmCreateCustomer.find("[name*='address']").val(),
    specialNotes: frmCreateCustomer.find("[name*='specialNotes']").val(),
    notes: frmCreateCustomer.find("[name*='notes']").val(),
  };

  strCustomer = JSON.stringify(customer);

  $.ajax({
    type: "POST",
    url: "/customers/addCustomer/" + strCustomer,
    beforeSend: function () {
      frmCreateCustomer.toggleClass("hidden");
      createCustomerModal
        .find(".lds-ellipsis")
        .toggleClass("hidden");
    },
    success: function (result) {
      if (result == "true") {
        customerName = frmCreateCustomer.find("[name*='firstName']").val() + " " + frmCreateCustomer.find("[name*='secondName']").val() + " " + frmCreateCustomer.find("[name*='thirdName']").val() + " " + frmCreateCustomer.find("[name*='lastName']").val();
        frmCheckIn.find("[name='customer']").text(customerName);
        frmCheckIn.find("[name='customer']").val(customerName);
        frmCheckIn.find("[name='customer']").attr('idNum',customer.idNum);
        createCustomerModal.find("button[data-dismiss='modal']").click();
        createCustomerModal
          .find(".lds-ellipsis")
          .toggleClass("hidden");
        // showDialog('تم إضافة العميل بنجاح');
        frmCreateCustomer.toggleClass("hidden");
        frmCreateCustomer.get(0).reset();

      }
    }
  });
});



$(".formClose").on("click", (e) => {
  var form = $("#" + $(e.target).attr("form"));
  // form.get(0).reset();
});











frmCheckIn.on("submit", (e) => {
  e.preventDefault();

  var reservation = {
    contractNum: frmCheckIn.find("[name*=contractNum]").val(),
    referenceID: frmCheckIn.find("[name*=referenceID]").val(),
    roomNumber: frmCheckIn.find("[name*=roomNumber]").val(),
    customer: frmCheckIn.find("[name*=customer]").val(),
    bookingType: frmCheckIn.find("[name*=bookingType]").val(),
    bookingSrc: frmCheckIn.find("[name*=bookingSrc]").val(),
    checkIn: frmCheckIn.find("[name*=checkIn]").val(),
    checkOut: frmCheckIn.find("[name*=checkOut]").val(),
    period: frmCheckIn.find("[name*=period]").val(),
    dailyPrice: frmCheckIn.find("[name*=dailyPrice]").val(),
    finalPrice: frmCheckIn.find("[name*=dailyPrice]").val() * frmCheckIn.find("[name*=period]").val(),
    total: frmCheckIn.find("[name*=total]").val(),
    notes: frmCheckIn.find("[name*=notes]").val(),
  };

  strReservation = JSON.stringify(reservation);
  alert(strReservation);
  $.ajax({
    type: "POST",
    url: "/managefreebookings/checkIn/" + strReservation,
    // beforeSend: function() {
    //   $("#modelCheckIn")
    //     .find(".lds-ellipsis")
    //     .toggleClass("hidden");
    //   frmCheckIn.toggleClass("hidden");
    //   frmCheckIn.removeClass("showen");
    // },
    success: function (result) {
      if (result == "true") {
        showDialog(result);
      }
    }
  });
})


$(".btnSelectCustomer i").click((event) => {
  customerName = $(event.target).parent().parent().parent().find("[data-title='Name']").text();
  idNum = $(event.target).parent().parent().parent().find("[data-title='ID Number']").text();
  frmCheckIn.find("[name='customer']").text(customerName);
  frmCheckIn.find("[name='customer']").val(customerName);
  frmCheckIn.find("[name='customer']").attr('idNum',idNum);
  searchCustomerModal.find("button[data-dismiss='modal']").click();
  getAccount(idNum);
});

$(".btn-room-checkIn").click(function () {
  frmCheckIn.get(0).reset();
  var target = $(event.target);
  if (target.is("div")) {
    var id = target.data()._id;
  } else {
    var id = target.parent().data()._id;
  }
  $.ajax({
    url: "/managefreebookings/room/" + id,
    beforeSend: function () {
      $("#modelCheckIn")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
      frmCheckIn.toggleClass("hidden");
      frmCheckIn.removeClass("showen");
    },
    success: function (result) {
      var room = result[0];
      setSelectedRoom(room);
      for (var prop in room) {
        if (
          prop == "roomNumber" ||
          prop == "dailyPrice" ||
          prop == "peakPrice"
        ) {
          input = frmCheckIn.find("label[name='" + prop + "']");
          input.text(room[prop]);
          input.val(room[prop]);
        }
      }
      updateCheckIn();
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
    beforeSend: function () {
      $("#updateRoomModal")
        .find(".lds-ellipsis")
        .toggleClass("hidden");
      $("#frmUpdateRoom").toggleClass("hidden");
      $("#frmUpdateRoom").removeClass("showen");
    },
    success: function (result) {
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

$(".btn-room-checkOut").click(function () {
  // frmCheckIn.get(0).reset();
  // var target = $(event.target);
  // if (target.is("div")) {
  //   var id = target.data()._id;
  // } else {
  //   var id = target.parent().data()._id;
  // }
  // $.ajax({
  //   url: "/managefreebookings/room/" + id,
  //   beforeSend: function () {
  //     $("#modelCheckIn")
  //       .find(".lds-ellipsis")
  //       .toggleClass("hidden");
  //     frmCheckIn.toggleClass("hidden");
  //     frmCheckIn.removeClass("showen");
  //   },
  //   success: function (result) {
  //     var room = result[0];
  //     for (var prop in room) {
  //       if (
  //         prop == "roomNumber" ||
  //         prop == "dailyPrice" ||
  //         prop == "peakPrice"
  //       ) {
  //         input = frmCheckIn.find("label[name='" + prop + "']");
  //         input.text(":" + room[prop]);
  //       }
  //     }
  //     frmCheckIn.toggleClass("hidden");
  //     frmCheckIn.addClass("showen");
  //     $("#modelCheckIn")
  //       .find(".lds-ellipsis")
  //       .toggleClass("hidden");
  //   }
  // });

  // $("#lbl_roomNumber").text(":" + $(this).data().roomnumber);
  // $("#lbl_dailyPrice").text(":" + $(this).data().dailyprice);
  // $("#lbl_peakPrice").text(":" + $(this).data().peakprice);
});

inputDays = $("#input_daysNum");

inputDays.keyup(function() {
  updateCheckIn();
});

function showDialog(string) {
  alert(string);
}

function setSelectedRoom(room) {
  window.selectedRoom = room;
  return true;
}



function updateCheckIn() {
  var payed = frmCheckIn.find("[name='payed']");
  var rent = frmCheckIn.find("[name='rent']");
  var insurence = frmCheckIn.find("[name='insurence']");
  var finalPrice = frmCheckIn.find("[name='finalPrice']");
  var total = frmCheckIn.find("[name='total']");
  var balance = frmCheckIn.find("[name='balance']");
  var dailyPrice = frmCheckIn.find("[name='dailyPrice']");
  var inputDays = $("#input_daysNum");

  price = parseInt(inputDays.val()) * parseFloat(dailyPrice.text());
  finalPrice.text(price);
  total.text(price);
}

function getAccount(idNum) {
  var finalPrice = frmCheckIn.find("[name='finalPrice']");
  var payed = frmCheckIn.find("[name='payed']");
  var balance = frmCheckIn.find("[name='balance']");
  // var idNum = frmCheckIn.find("[name='customer']").attr("idnum");
  $.ajax({
    url: "/customers/getAccount/" + idNum,
    beforeSend: function () {
     
    },
    success: function (result) {
     alert(result[0].accountNumber)
    }
  });
}

var dataSource = new kendo.data.DataSource({
  transport: {
    read: {
      url: "//public/products.json",
      dataType: "jsonp"
    }
  }
});

// var select = $("#bookingSrc").data("kendoComboBox");
