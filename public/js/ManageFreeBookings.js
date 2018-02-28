            var dialog = $("#checkIn").dialog({
                autoOpen: false,
                height: 700,
                width: 850,
                show: {
                    effect: "fade",
                    duration: 500
                },
                hide: {
                    effect: "puff",
                    duration: 200
                },
                modal: true,
                buttons: {
                    CrUser: {
                        text: 'حفظ',
                        class: 'mybtn-dialog mybtn-dialog-save',
                        click: () => {

                        },
                    },
                    Cancel: {
                        text: "الغاء الأمر",
                        class: 'mybtn-dialog mybtn-dialog-save',
                        click: () => {
                            dialog.dialog("close");
                        }
                    }
                },
                close: function () {
                    //  form[0].reset();
                    //   allFields.removeClass( "ui-state-error" );
                }
            });

            $("#clickme").click(function () {
                dialog.dialog("open");
            });