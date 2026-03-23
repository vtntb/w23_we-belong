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

window.onload = function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const btn = document.getElementById("enrolBtn");

    if (isLoggedIn !== "true") {
        btn.innerText = "Register to Enroll";

        btn.onclick = function () {
            window.location.href = "/login.html";
        };
    }
};