      var logIn_dialog = $("#checkIn").dialog({
                title: "تسجيل دخول",
                autoOpen: false,
                draggable: false,
                height: 700,
                width: 850,
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
                            logIn_dialog.dialog("close");
                        }
                    }
                },
                close: function () {
                    //  form[0].reset();
                    //   allFields.removeClass( "ui-state-error" );
                }
            });

            $(".btn-logIn").click(function () {
                logIn_dialog.dialog("open");
            });

           

            var dataSource = new kendo.data.DataSource({
                transport: {
                  read: {
                    url: "//public/products.json",
                    dataType: "jsonp"
                  }
                }
              });
              
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

