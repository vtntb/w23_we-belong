$(document).ready(function () {
    // load header
    $("#header-placeholder").load("/components/header.html", function () {
        updateLoginLink();
    });

    // load footer
    $("#footer-placeholder").load("/components/footer.html");

    // load banner and check if is a course
    $("#banner-placeholder").load("/components/banner.html", function () {
        $(".banner-title").text($("body").data("title"));

        if (!$("body").data("button")) {
            $(".hublink").hide();
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
                localStorage.removeItem("authToken");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userFirstName");
                localStorage.removeItem("userLastName");
                localStorage.removeItem("userId");
                window.location.href = "/login.html";
            };
        } else {
            loginLink.innerText = "Login";
            loginLink.href = "/login.html";
            loginLink.onclick = null;
        }
    }
}

document.addEventListener("click", function (event) {
    const menuBtn = event.target.closest("#mobileMenuBtn");
    const mainMenu = document.querySelector("#mainnavMenu");
    const dropdownLink = event.target.closest(".dropdown > a");

    if (!mainMenu) {
        return;
    }

    if (menuBtn) {
        mainMenu.classList.toggle("show");
        return;
    }

    if (dropdownLink && window.innerWidth <= 768) {
        event.preventDefault();

        const dropdown = dropdownLink.parentElement;

        document.querySelectorAll(".dropdown").forEach(function (item) {
            if (item !== dropdown) {
                item.classList.remove("open");
            }
        });

        dropdown.classList.toggle("open");
        return;
    }

    if (!mainMenu.contains(event.target)) {
        mainMenu.classList.remove("show");

        document.querySelectorAll(".dropdown").forEach(function (item) {
            item.classList.remove("open");
        });
    }
});