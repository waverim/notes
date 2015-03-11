$("#header-drop").hover(function () {
    var list = $("#header-droplist");
    if (list.is(":hidden")) {
        list.show();
    }
});

$("#header-droplist").mouseleave(function () {
    $(this).hide();
})

$(".arrow").click(function () {
    arrow = $(this);
    var next = arrow.next();
    if (next.is(":hidden")) {
        if (arrow.hasClass("arrow-odd")) {
            arrow.css({"background-image": "url('./img/arrow/right-unfilled.png')"});
        } else {
            arrow.css({"background-image": "url('./img/arrow/left-unfilled.png')"});
        }
        next.show();
    } else {
        if (arrow.hasClass("arrow-odd")) {
            arrow.css({"background-image": "url('./img/arrow/right-filled.png')"});
        } else {
            arrow.css({"background-image": "url('./img/arrow/left-filled.png')"});
        }
        next.hide();
    }
});

$("#choose-btn").hover(function () {
    $("#choose-list").show();
}, function () {
    $("#choose-list").hide();
});

$(".choose-item").click(function () {
    $("#choose-text").text($(this).text());
    $("#choose-list").hide();
})