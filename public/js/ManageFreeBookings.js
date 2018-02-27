            var dialog = $("#checkIn").dialog({
                autoOpen: false,
                height: 400,
                width: 350,
                modal: true,
                buttons: {
                    "Create an account": "",
                    Cancel: function () {
                        dialog.dialog("close");
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