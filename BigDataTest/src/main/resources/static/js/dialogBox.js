$(".closemodel").click(function(){
    getMess();
    // $("#model-carId").show();
    // $("#model-destination").show();
    // $("#model-timepick").show();
    // $("#model-daterange").show();
    $('#hisForm').show();
    $('#netForm').show();
    $('#verForm').show();
});
//对话框
function getMess() {
    //Initialize Select2 Elements
    $('.select2').select2();

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        startDate: moment().startOf('hour').subtract(1, 'days'),
        endDate: moment().startOf('hour'),
        locale:{
            format: 'YYYY/MM/DD h:mm A'
        }
    });
    // //Date range as a button
    // $('#daterange-btn').daterangepicker(
    //     {
    //         ranges   : {
    //             'Today'       : [moment(), moment()],
    //             'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //             'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    //             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //             'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    //             'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //         },
    //         startDate: moment().subtract(29, 'days'),
    //         endDate  : moment()
    //     },
    //     function (start, end) {
    //         $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    //     }
    // )

    //Date picker
    // $('#datepicker').datepicker({
    //     autoclose: true
    // })

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    // $('.my-colorpicker1').colorpicker()
    // //color picker with addon
    // $('.my-colorpicker2').colorpicker()

    // Timepicker
    $('.timepicker').timepicker({
        showInputs: false
    })
}

//对话框-历史轨迹
function getHisMess() {
    $('#myModalLabel').text("历史轨迹");
    $('#hisForm').show();
    $('#netForm').hide();
    $('#verForm').hide();
    // $("#model-timepick").hide();
    //     // $("#model-destination").hide();
    //Initialize Select2 Elements
    $('.select2').select2();

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservation').daterangepicker();
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        startDate: moment().startOf('hour').subtract(1, 'days'),
        endDate: moment().startOf('hour'),
        locale:{
            format: 'YYYY/MM/DD h:mm A'
        }
    });
    //time picker
    $("#timepick").timepicker()
    //Date range as a button
    // $('#daterange-btn').daterangepicker(
    //     {
    //         ranges   : {
    //             'Today'       : [moment(), moment()],
    //             'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    //             'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    //             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    //             'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    //             'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    //         },
    //         startDate: moment().subtract(29, 'days'),
    //         endDate  : moment()
    //     },
    //     function (start, end) {
    //         $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
    //     }
    // )

    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    })

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()

    //Timepicker
    $('.timepicker').timepicker({
        showInputs: false
    })
}

//对话框-路网信息
function getNetMess() {
    $('#myModalLabel').text("路网信息");

    // $("#model-carId").hide();
    // $("#model-daterange").hide();
    // $("#model-timepick").hide();
    $('#netForm').show();
    $('#hisForm').hide();
    $('#verForm').hide();
    //Initialize Select2 Elements
    $('.select2').select2()

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservation').daterangepicker()
    //Date range picker with time picker
    $('#reservationtime').daterangepicker({ timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A' })
    //Date range as a button


    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    })

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()

    //Timepicker
    $('.timepicker').timepicker({
        showInputs: false
    })

}

//对话框-车辆检索
function getVehMess() {
    $('#myModalLabel').text("车辆检索");

    // $("#model-daterange").hide();
    // $("#model-destination").hide();
    $('#verForm').show();
    $('#netForm').hide();
    $('#hisForm').hide();
    //Initialize Select2 Elements
    $('.select2').select2()

    //Datemask dd/mm/yyyy
    $('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
    //Datemask2 mm/dd/yyyy
    $('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
    //Money Euro
    $('[data-mask]').inputmask()

    //Date range picker
    $('#reservation').daterangepicker()

    //Date picker
    $('#datepicker').datepicker({
        autoclose: true
    })

    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass   : 'iradio_minimal-blue'
    })
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass   : 'iradio_minimal-red'
    })
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass   : 'iradio_flat-green'
    })

    //Colorpicker
    $('.my-colorpicker1').colorpicker()
    //color picker with addon
    $('.my-colorpicker2').colorpicker()

    //Timepicker
    $('.timepicker').timepicker({
        showInputs: false
    })
}
//导航点击事件
function his() {
    getHisMess();
    //历史轨迹验证
    $('#hisForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            theCarId: {
                validators: {
                    notEmpty: {
                        message: '车牌号不能为空'
                    },
                    stringLength: {
                        max: 7,
                        message: '最大长度为7'
                    },
                    regexp:{
                        regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '请输入正确的车牌号'
                    }
                }
            },
            datetimes: {
                validators: {
                    notEmpty: {
                        message: '日期不能为空'
                    }
                },
            }
        }
    }).on('success.form.bv', function () {
        var flag = $('#hisForm').data("bootstrapValidator").isValid();
        if (flag){
            //将车辆id、时间跨度缓存
            var carID = $("#carId").val();
            var dateTimeRange = $("#reservationtime").val();

            // hisVer(carID, dateTimeRange);

            localStorage.setItem("carID", carID);
            localStorage.setItem("dataTimeRange", dateTimeRange);

            //跳转网页
            window.location.href='historicalRoute';
        }
    })

}
function net() {

    getNetMess();
    //路网信息验证
    $('#netForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            theDes: {
                validators: {
                    notEmpty: {
                        message: '地点不能为空'
                    },
                    stringLength: {
                        max: 30,
                        message: '超出最大长度'
                    }
                }
            }
        }
    }).on('success.form.bv', function () {
        var flag = $('#netForm').data("bootstrapValidator").isValid();
        if (flag) {
            //地点信息缓存
            var destination = $("#destination").val();
            localStorage.setItem("destination", destination);

            //跳转页面
            window.location.href = 'NetworkInformation';
        }
    })

}
function veh() {
    // alert ("haha,大傻瓜");
    getVehMess();
    //车辆检索验证
    $('#verForm').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            theCarId2: {
                validators: {
                    notEmpty: {
                        message: '车牌号不能为空'
                    },
                    stringLength: {
                        max: 7,
                        message: '最大长度为7'
                    },
                    regexp:{
                        regexp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
                        message: '请输入正确的车牌号'
                    }
                }
            }
        }
    }).on('success.form.bv', function () {
        var flag = $('#verForm').data("bootstrapValidator").isValid();
        if (flag){

            //缓存车辆ID以及时间点
            var carId = $("#carId2").val();
            var timePoint = $("#timepick").val();
            localStorage.setItem("carId", carId);
            localStorage.setItem("timePick", timePoint);
            //跳转页面
            window.location.href='VehicleToRetrieve';
        }
    })

}