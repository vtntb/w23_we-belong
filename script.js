$(document).ready(function () {
    // load header
    $("#header-placeholder").load("/header.html", function () {
        updateLoginLink();
    });

    // load footer
    $("#footer-placeholder").load("/footer.html");

    // load banner and check if is a course
    $("#banner-placeholder").load("/banner.html", function () {
        $(".banner-title").text($("body").data("title"));

        if (!$("body").data("button")) {
            $(".back-btn").hide();
        }
    });
});

/* ===== LOGIN / LOGOUT ===== */
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
                window.location.href = "/login.html";
            };
        } else {
            loginLink.innerText = "Login";
            loginLink.href = "/login.html";
            loginLink.onclick = null;
        }
    }
}