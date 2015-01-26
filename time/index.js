function $ (id) {
    return document.getElementById(id);
}

var input_year = $("input-year"),
    input_month = $("input-month"),
    input_day = $("input-day"),
    input_hour = $("input-hour"),
    input_min = $("input-min"),
    input_sec = $("input-sec");

var btn = $("btn");

var show_day = $("show-day"),
    show_hour = $("show-hour"),
    show_min = $("show-min"),
    show_sec = $("show-sec");

var array_month = [31,28,31,30,31,30,31,31,30,31,30,31];

btn.onclick = function time () {
    var date = new Date();

    var input_year_value = parseInt(input_year.value),
        input_month_value = parseInt(input_month.value),
        input_day_value = parseInt(input_day.value),
        input_hour_value = parseInt(input_hour.value),
        input_min_value = parseInt(input_min.value),
        input_sec_value = parseInt(input_sec.value);

    if (! verify(input_year_value, input_month_value, input_day_value,
            input_hour_value, input_min_value, input_sec_value,
            date.getFullYear())) {
        $("error").innerText = "输入有误";
    }
    else if (parseInt(show_day.innerText) < 0 || parseInt(show_hour.innerText < 0)
        || parseInt(show_min.innerText < 0) || parseInt(show_sec.innerText < 0)) {
        $("error").innerText = "请输入当前时间之前的时间";
        show_day.innerText = show_hour.innerText = show_min.innerText = show_sec.innerText = 0;
    }
    else {
        $("error").innerText = "";
        var interval = calculate(
            input_year_value, input_month_value, input_day_value,
            input_hour_value, input_min_value, input_sec_value,
            date.getFullYear(), date.getMonth() + 1, date.getDate(),
            date.getHours(), date.getMinutes(), date.getSeconds());

        show_day.innerText = interval.day;
        show_hour.innerText = interval.hour;
        show_min.innerText = interval.min;
        show_sec.innerText = interval.sec;

        // 循环计数
        setTimeout(function () {
            time();
        }, 1000);
    }
};

// 闰年
function is_leap_year (year) {
    if (year % 100 == 0)
        return year % 400 == 0;
    else
        return year % 4 == 0;
}

// 当年第几天
function day_of_year (y, m, d) {
    var result = d;

    for (var i = 1; i < m; i++)
        result += array_month[i-1]

    if (is_leap_year(y) && m > 2)
        result += 1;

    return result
}

// 相隔天数
function day_apart (y1, m1, d1, y2, m2, d2) {
    var day_left_of_year_1 = 365 - day_of_year(y1, m1, d1),
        day_of_year_2 = day_of_year(y2, m2, d2);

    if (is_leap_year(y1))
        day_left_of_year_1 += 1;

    var result = day_left_of_year_1 + day_of_year_2 + (y2 - y1 - 1) * 365;

    for (var i = y1 + 1; i < y2; i++)
        if (is_leap_year(i))
            result += 1;

    return result
}

// 当天第几秒
function sec_of_day (h, m, s) {
    return h * 3600 + m * 60 + s;
}

// 相隔秒数
function sec_apart (h1, m1, s1, h2, m2, s2) {
    var secs1 = sec_of_day(h1, m1, s1),
        secs2 = sec_of_day(h2, m2, s2);
    if (secs1 > secs2)
        return {
            carry: -1,
            secs: secs2 + 86400 - secs1
        };
    else
        return {
            carry: 0,
            secs: secs2 - secs1
        };
}

// 秒 -> 天
function sec_to_day (s) {
    return {
        day: Math.floor(s / 86400),
        hour: Math.floor(s % 86400 / 3600),
        min: Math.floor(s % 86400 % 3600 / 60),
        sec: Math.floor(s % 86400 % 3600 % 60)
    };
}

// 计算
function calculate (y1, mo1, d1, h1, mi1, s1, y2, mo2, d2, h2, mi2, s2) {
    var days = day_apart(y1, mo1, d1, y2, mo2, d2);
    var secApart = sec_apart(h1, mi1, s1, h2, mi2, s2);
    var secs = sec_to_day(secApart.secs);
    return {
        day: days + secApart.carry,
        hour: secs.hour,
        min: secs.min,
        sec: secs.sec
    };
}

// 验证
function verify (y1, mo1, d1, h1, mi1, s1, y2) {
    var year = y1 >= 0 && y1 <= y2,
        month = mo1 >= 1 && mo1 <= 12,
        day = d1 >= 0 && d1 <= array_month[mo1-1],
        hour = h1 >= 0 && h1 < 24,
        min = mi1 >= 0 && mi1 < 60,
        sec = s1 >=0 && s1 < 60;

    return year && month && day && hour && min && sec;
}