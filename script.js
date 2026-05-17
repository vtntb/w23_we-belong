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
            $(".hublink").hide();
        }
    });

    $("#course-placeholder").load("/course-box.html", function () {
        initCourseProgress();
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

function initCourseProgress() {
    const pageType = document.body.dataset.pageType;
    if (pageType !== "course") return;

    const courseId = document.body.dataset.courseId;
    const totalLessons = parseInt(document.body.dataset.totalLessons) || 0;

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const enrolBtn = document.getElementById("enrolBtn");
    const courseStatus = document.getElementById("courseStatus");
    const lessons = document.querySelectorAll(".lesson");

    if (!courseId || !enrolBtn || !courseStatus || lessons.length === 0) return;

    const enrolledKey = `enrolled_${courseId}`;
    const progressKey = `progress_${courseId}`;

    let isEnrolled = localStorage.getItem(enrolledKey) === "true";
    let progress = parseInt(localStorage.getItem(progressKey)) || 0;

    function saveState() {
        localStorage.setItem(enrolledKey, isEnrolled ? "true" : "false");
        localStorage.setItem(progressKey, progress.toString());
    }

    function updateStatus() {
        courseStatus.classList.remove("not-enrolled", "enrolled", "completed");

        if (!isEnrolled) {
            courseStatus.textContent = "NOT ENROLLED";
            courseStatus.classList.add("not-enrolled");
        } else if (progress >= totalLessons) {
            courseStatus.textContent = "COMPLETED";
            courseStatus.classList.add("completed");
        } else {
            courseStatus.textContent = "ENROLLED";
            courseStatus.classList.add("enrolled");
        }
    }

    function updateButton() {
        if (!isEnrolled) {
            enrolBtn.textContent = isLoggedIn ? "Enrol Now" : "Register to Enrol";
        } else if (progress >= totalLessons) {
            enrolBtn.textContent = "Course Completed";
        } else {
            enrolBtn.textContent = "Continue Course";
        }
    }

    function updateLessons() {
        lessons.forEach((lesson) => {
            const lessonNumber = parseInt(lesson.dataset.lesson);
            const link = lesson.querySelector("a");

            lesson.classList.remove("locked", "available", "completed");

            if (!isEnrolled) {
                lesson.classList.add("locked");
                if (link) link.onclick = (e) => e.preventDefault();
                return;
            }

            if (lessonNumber <= progress) {
                lesson.classList.add("completed");
                if (link) link.onclick = null;
            } else if (lessonNumber === progress + 1) {
                lesson.classList.add("available");
                if (link) {
                    link.onclick = function () {
                        if (progress < lessonNumber) {
                            localStorage.setItem(progressKey, lessonNumber.toString());
                        }
                    };
                }
            } else {
                lesson.classList.add("locked");
                if (link) {
                    link.onclick = function (e) {
                        e.preventDefault();
                        alert("Please complete the previous lesson first.");
                    };
                }
            }
        });
    }

    function renderCourseUI() {
        updateStatus();
        updateButton();
        updateLessons();
        saveState();
    }

    enrolBtn.onclick = function () {
        if (!isLoggedIn) {
            window.location.href = "/login.html";
            return;
        }

        if (!isEnrolled) {
            isEnrolled = true;
            progress = 0;
            renderCourseUI();
            return;
        }

        const nextLesson = document.querySelector(`.lesson[data-lesson="${progress + 1}"] a`);
        if (nextLesson) {
            nextLesson.click();
        }
    };

    renderCourseUI();
}