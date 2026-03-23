$(document).ready(function () {
    $("#header-placeholder").load("/header.html");
    $("#footer-placeholder").load("/footer.html");

    $("#banner-placeholder").load("/banner.html", function () {
        $(".banner-title").text($("body").data("title"));

        if (!$("body").data("button")) {
            $(".back-btn").hide();
        }
    });
});