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

btn.onclick = function () {
    var date = new Date();
    var interval = calculate(
        parseInt(input_year.value), parseInt(input_month.value), parseInt(input_day.value),
        parseInt(input_hour.value), parseInt(input_min.value), parseInt(input_sec.value),
        date.getFullYear(), date.getMonth() + 1, date.getDate(),
        date.getHours(), date.getMinutes(), date.getSeconds());

    show_day.innerText = interval.day;
    show_hour.innerText = interval.hour;
    show_min.innerText = interval.min;
    show_sec.innerText = interval.sec;

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

function sec_apart (h1, m1, s1, h2, m2, s2) {
    return sec_of_day(h2, m2, s2) + 86400 - sec_of_day(h1, m1, s1)
}

function sec_to_day (s) {
    return {
        day: Math.floor(s / 86400),
        hour: Math.floor(s % 86400 / 3600),
        min: Math.floor(s % 86400 % 3600 / 60),
        sec: Math.floor(s % 86400 % 3600 % 60)
    };
}

function calculate (y1, mo1, d1, h1, mi1, s1, y2, mo2, d2, h2, mi2, s2) {
    var days = day_apart(y1, mo1, d1, y2, mo2, d2);
    var secs = sec_to_day(sec_apart(h1, mi1, s1, h2, mi2, s2));
    return {
        day: days + secs.day,
        hour: secs.hour,
        min: secs.min,
        sec: secs.sec
    };
}