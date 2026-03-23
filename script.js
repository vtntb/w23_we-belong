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

    updateCourseState();
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
                localStorage.removeItem("awarenessEnrolled");

                window.location.reload();
            };
        } else {
            loginLink.innerText = "Login";
            loginLink.href = "/login.html";
            loginLink.onclick = null;
        }
    }
}

/* ===== COURSE STATE ===== */
function updateCourseState() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const isEnrolled = localStorage.getItem("awarenessEnrolled") === "true";

    const btn = document.getElementById("enrolBtn");
    const status = document.getElementById("courseStatus");
    const lessons = document.querySelectorAll(".lesson");

    if (!btn || !status) return;

    /* LOCK lessons */
    function lockLessons() {
        lessons.forEach((lesson) => {
            lesson.classList.add("locked");
        });
    }

    /* UNLOCK lessons */
    function unlockLessons() {
        lessons.forEach((lesson) => {
            lesson.classList.remove("locked");
            lesson.style.cursor = "pointer";

            lesson.onclick = function () {
                alert("Opening lesson...");
            };
        });
    }

    /* ===== STATES ===== */

    // NOT LOGGED IN
    if (!isLoggedIn) {
        status.innerText = "NOT ENROLLED";
        status.className = "status not-enrolled";

        btn.innerText = "Register to Enroll";
        lockLessons();

        btn.onclick = function () {
            alert("Please log in first");
            window.location.href = "/login.html";
        };
    }

    // LOGGED IN BUT NOT ENROLLED
    else if (!isEnrolled) {
        status.innerText = "NOT ENROLLED";
        status.className = "status not-enrolled";

        btn.innerText = "Enroll Now";
        lockLessons();

        btn.onclick = function () {
            localStorage.setItem("awarenessEnrolled", "true");
            alert("Successfully enrolled!");
            location.reload();
        };
    }

    // ENROLLED
    else {
        status.innerText = "ENROLLED";
        status.className = "status enrolled";

        btn.innerText = "Go to Course";
        unlockLessons();

        btn.onclick = function () {
            alert("Start learning!");
        };
    }
}