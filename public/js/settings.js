$('#settings_modules').append('<div id="changingBookingTypes">hello</div>');   

var bookingTypesdialog = $("#changingBookingTypes").dialog({
    title: "أنواع الحجز",
    autoOpen: false,
    draggable: false,
    height: 450,
    width: 400,
    show: {
        effect: "fade",
        duration: 500
    },
    hide: {
        effect: "Transfer",
        duration: 200
    },
    modal: true,
    buttons: {
        save: {
            text: 'حفظ',
            class: 'mybtn-dialog mybtn-dialog-save',
            click: () => {

            },
        },
        Cancel: {
            text: "الغاء الأمر",
            class: 'mybtn-dialog mybtn-dialog-save',
            click: () => {
                bookingTypesdialog.dialog("close");
            }
        }
    },
    close: function () {
        //  form[0].reset();
        //   allFields.removeClass( "ui-state-error" );
    }
});

$("#btnBookingTypes").click(function () {
    bookingTypesdialog.dialog("open");
});
