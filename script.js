$(document).ready(function () {
    $("#header-placeholder").load("/header.html", function () {
        updateLoginLink();
    });

    $("#footer-placeholder").load("/footer.html");

    $("#banner-placeholder").load("/banner.html", function () {
        $(".banner-title").text($("body").data("title"));

        if (!$("body").data("button")) {
            $(".back-btn").hide();
        }
    });

    updateEnrolButton();
});

function updateEnrolButton() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const btn = document.getElementById("enrolBtn");

    if (btn) {
        if (isLoggedIn === "true") {
            btn.innerText = "Enrol Now";
            btn.onclick = function () {
                alert("Successfully enrolled!");
            };
        } else {
            btn.innerText = "Register to Enrol";
            btn.onclick = function () {
                window.location.href = "/login.html";
            };
        }
    }
}

function updateLoginLink() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginLink = document.getElementById("loginhref");

    if (loginLink) {
        if (isLoggedIn === "true") {
            loginLink.innerText = "Logout";
            loginLink.href = "#";

            loginLink.onclick = function (e) {
                e.preventDefault();

                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userEmail");

                window.location.href = "/login.html";
            };
        } else {
            loginLink.innerText = "Login";
            loginLink.href = "/login.html";
            loginLink.onclick = null;
        }
    }
}