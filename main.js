$(document).ready(function () {
    $("#btn_view").click(function () {
        var num = parseFloat($("#txt_digital").val());

        if (isNaN(num)) {
            $("#div_view_digital").html("不是有效的数字");
        } else {
            //$("#div_view_digital").digital(num);
            //$("#div_view_digital").digital({ "num": num });
            //$("#div_view_digital").digital({ "size": 200 });
            $("#div_view_digital").digital({ "num": num, "size": 50, "spacing": 0.4, "skin": "default" });
        }
    });
});