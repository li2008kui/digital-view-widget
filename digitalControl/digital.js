﻿/*digital v1.0.2 | Copyright (c) 2014 thiscoder.com*/

//扩展JQuery方法
(function ($) {
    $.fn.digital = function (options) {
        var num = 0;//要显示的数字
        var size = 10;//字体大小
        var spacing = 0.4;//字间距百分比
        var skin = "default";//皮肤

        if (isNaN(parseFloat(options))) {
            options = $.extend({
                num: 0,
                size: 10,
                spacing: 0.4,
                skin: "default"
            }, options || {});

            num = options.num;
            size = options.size;
            spacing = options.spacing;
            skin = options.skin;
        } else {
            num = options;
        }

        var digital_size = (!isNaN(parseInt(size)) && size > 10) ? size : 10;//数字大小
        var line_length = digital_size;//线长
        var line_diameter = digital_size / 5;//线粗
        var line_incline = line_diameter / 10;//倾斜
        var digitalHtml = num.toDigital(digital_size, line_length, line_diameter, line_incline, spacing, skin);
        $(this).html(digitalHtml);
    }
})(jQuery);

//转换为自定义的数字显示
Number.prototype.toDigital = function (digital_size, line_length, line_diameter, line_incline, spacing, skin) {
    var numString = this.toString();
    var digitals = new String();
    var passPoint = 0;

    if (!numString.isNumeric()) {
        return "&#x4E0D;&#x662F;&#x6709;&#x6548;&#x7684;&#x6570;&#x5B57;";
    }

    for (var i = 0; i < numString.length; i++) {
        if (numString[i] == ".") {
            passPoint++;
            continue;
        }

        digitals += (numString[i] + (i + 1 < numString.length ? numString[i + 1] : "*")).createDigital(digital_size, line_length, line_diameter, line_incline, spacing, skin, i - passPoint);
    }

    return digitals;
};

//生成一个自定义的数字
String.prototype.createDigital = function (digital_size, line_length, line_diameter, line_incline, spacing, skin, index) {
    if (this.length < 1) {
        return "";
    }

    var digital = new String();
    var js = document.scripts || document.getElementsByTagName("script");
    var jsUrl = new String();

    for (var i = 0; i < js.length; i++) {
        if (js[i].src.lastIndexOf("digital.js") >= 0) {
            jsUrl = js[i].src.substring(0, js[i].src.lastIndexOf("/"));
            break;
        }
    }

    digital = "<div class=\"div_digital\" style=\"width:" + line_length * (1 + spacing) + "px; height: " + (line_length * 2) + "px; float: left;" + "\">" +
       "<img class=\"img_a img_h\" src=\"" + jsUrl + "/skins/" + skin + "/h.png\" alt=\"a\" style=\"position: absolute; display: " + ((this[0] != "1" && this[0] != "4") ? "block" : "none") + "; width: " + line_length + "px; height: " + line_diameter + "px; top: 0px; left: " + (digital_size * index * (1 + spacing) + line_incline * 5) + "px;\" />" +
       "<img class=\"img_b img_v\" src=\"" + jsUrl + "/skins/" + skin + "/v.png\" alt=\"b\" style=\"position: absolute; display: " + ((this[0] != "5" && this[0] != "6") ? "block" : "none") + "; width: " + line_diameter + "px; height: " + line_length + "px; top: 0px; left: " + (digital_size * index * (1 + spacing) + line_incline * 4 + line_length - line_diameter) + "px;\" />" +
       "<img class=\"img_c img_v\" src=\"" + jsUrl + "/skins/" + skin + "/v.png\" alt=\"c\" style=\"position: absolute; display: " + (this[0] != "2" ? "block" : "none") + "; width: " + line_diameter + "px; height: " + line_length + "px; top: " + (line_length - line_diameter) + "px; left: " + (digital_size * index * (1 + spacing) + line_incline + line_length - line_diameter) + "px;\" />" +
       "<img class=\"img_d img_h\" src=\"" + jsUrl + "/skins/" + skin + "/h.png\" alt=\"d\" style=\"position: absolute; display: " + ((this[0] != "1" && this[0] != "4" && this[0] != "7") ? "block" : "none") + "; width: " + line_length + "px; height: " + line_diameter + "px; top: " + (line_length * 2 - line_diameter * 2) + "px; left: " + digital_size * index * (1 + spacing) + "px;\" />" +
       "<img class=\"img_e img_v\" src=\"" + jsUrl + "/skins/" + skin + "/v.png\" alt=\"e\" style=\"position: absolute; display: " + ((this[0] == "0" || this[0] == "2" || this[0] == "6" || this[0] == "8") ? "block" : "none") + "; width: " + line_diameter + "px; height: " + line_length + "px; top: " + (line_length - line_diameter) + "px; left: " + (digital_size * index * (1 + spacing) + line_incline) + "px;\" />" +
       "<img class=\"img_f img_v\" src=\"" + jsUrl + "/skins/" + skin + "/v.png\" alt=\"f\" style=\"position: absolute; display: " + ((this[0] != "1" && this[0] != "2" && this[0] != "3" && this[0] != "7") ? "block" : "none") + "; width: " + line_diameter + "px; height: " + line_length + "px; top: 0px; left: " + (digital_size * index * (1 + spacing) + line_incline * 4) + "px;\" />" +
       "<img class=\"img_g img_h\" src=\"" + jsUrl + "/skins/" + skin + "/h.png\" alt=\"g\" style=\"position: absolute; display: " + ((this[0] != "0" && this[0] != "1" && this[0] != "7") ? "block" : "none") + "; width: " + line_length + "px; height: " + line_diameter + "px; top: " + (line_length - line_diameter) + "px; left: " + (digital_size * index * (1 + spacing) + line_incline * 2) + "px;\" />" +
       "<img class=\"img_p\" src=\"" + jsUrl + "/skins/" + skin + "/p.png\" alt=\"p\" style=\"position: absolute; display: " + (this[1] == "." ? "block" : "none") + "; width: " + line_diameter + "px; height: " + line_diameter + "px; top: " + (line_length * 2 - line_diameter * 2) + "px; left: " + (digital_size * index * (1 + spacing) + line_length + line_diameter / 4) + "px;\" />" +
   "</div>";

    return digital;
};

//判断是否是数字
String.prototype.isNumeric = function () {
    return !isNaN(parseFloat(this));
};