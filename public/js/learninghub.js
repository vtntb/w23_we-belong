// Load course banner
$(document).ready(function () {
    if ($("body").data("page-type") === "course") {
        $("#course-placeholder").load("/pages/LearningHub/coursebanner.html", function () {
            if (typeof initCoursePage === "function") {
                initCoursePage();
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    initLessonPage();
});

/* ===== HELPERS ===== */
function getCourseId() {
    return document.body.dataset.courseId;
}

function getTotalLessons() {
    return parseInt(document.body.dataset.totalLessons || "0", 10);
}

function getLessonNumber() {
    return parseInt(document.body.dataset.lessonNumber || "0", 10);
}

function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

function getAuthHeaders() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("authToken")
    };
}

async function fetchCourseProgress(courseId) {
    const response = await fetch("/api/progress/" + courseId, {
        method: "GET",
        headers: getAuthHeaders()
    });

    return await response.json();
}

async function enrolInCourse(courseId) {
    const response = await fetch("/api/progress/enrol", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ courseId: courseId })
    });

    return await response.json();
}

async function completeLesson(courseId, lessonNumber) {
    const response = await fetch("/api/progress/complete-lesson", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            courseId: courseId,
            lessonNumber: lessonNumber
        })
    });

    return await response.json();
}

/* ===== COURSE PAGE ===== */
async function initCoursePage() {
    if (document.body.dataset.pageType !== "course") return;

    const courseId = getCourseId();
    const totalLessons = getTotalLessons();

    const btn = document.getElementById("enrolBtn");
    const status = document.getElementById("courseStatus");
    const lessons = document.querySelectorAll(".lesson");

    const progressWrap = document.getElementById("progressWrap");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");
    const progressBadge = document.getElementById("progressBadge");

    if (!btn || !status || !courseId) return;

    function lockLessons() {
        lessons.forEach((lesson) => {
            lesson.classList.add("locked");
            lesson.classList.remove("unlocked");
        });
    }

    function unlockLessons() {
        lessons.forEach((lesson) => {
            lesson.classList.remove("locked");
            lesson.classList.add("unlocked");
            const link = lesson.querySelector("a");
            if (link) {
                lesson.onclick = function () {
                    window.location.href = link.href;
                };
            }
        });
    }

    function updateProgressUI(progress) {
        if (progressWrap) progressWrap.style.display = "block";
        if (progressFill) progressFill.style.width = progress.percent + "%";
        if (progressText) {
            progressText.textContent = `${progress.completedCount}/${progress.totalLessons} lessons completed`;
        }
        if (progressBadge) {
            progressBadge.textContent = progress.percent === 100 ? "COMPLETED" : "IN PROGRESS";
        }
    }

    if (!isLoggedIn()) {
        status.innerText = "NOT ENROLLED";
        status.className = "status not-enrolled";

        btn.innerText = "Register to Enroll";
        btn.onclick = function () {
            window.location.href = "/login.html";
        };

        if (progressWrap) progressWrap.style.display = "none";
        lockLessons();
        return;
    }

    const progress = await fetchCourseProgress(courseId);

    if (!progress.isEnrolled) {
        status.innerText = "NOT ENROLLED";
        status.className = "status not-enrolled";

        btn.innerText = "Enroll Now";
        btn.onclick = async function () {
            await enrolInCourse(courseId);
            location.reload();
        };

        if (progressWrap) progressWrap.style.display = "none";
        lockLessons();
        return;
    }

    status.innerText = "ENROLLED";
    status.className = "status enrolled";

    btn.innerText = "Start Learning";
    btn.onclick = function () {
        const firstLessonLink = document.querySelector(".lesson a");
        if (firstLessonLink) {
            window.location.href = firstLessonLink.href;
        }
    };

    unlockLessons();

    // Green Circle confirm
    const completedLessons = progress.completedLessons;

    lessons.forEach((lesson, index) => {
        const lessonNumber = index + 1;

        if (completedLessons.includes(lessonNumber)) {
            lesson.classList.add("completed");
        }
    });

    updateProgressUI(progress);
}

/* ===== LESSON PAGE ===== */
async function initLessonPage() {
    if (document.body.dataset.pageType !== "lesson") return;

    const courseId = getCourseId();
    const lessonNumber = getLessonNumber();

    const markBtn = document.getElementById("markCompleteBtn");
    const doneMsg = document.getElementById("lessonDoneMsg");

    if (!markBtn || !courseId || !lessonNumber) return;

    if (!isLoggedIn()) {
        markBtn.innerText = "Login to Access";
        markBtn.disabled = true;
        return;
    }

    const progress = await fetchCourseProgress(courseId);

    if (!progress.isEnrolled) {
        markBtn.innerText = "Enroll to Access";
        markBtn.disabled = true;
        return;
    }

    const alreadyCompleted = progress.completedLessons.includes(lessonNumber);

    if (alreadyCompleted) {
        markBtn.innerText = "Completed";
        markBtn.disabled = true;

        if (doneMsg) {
            doneMsg.style.display = "block";
        }

        return;
    }

    markBtn.onclick = async function () {
        await completeLesson(courseId, lessonNumber);

        markBtn.innerText = "Completed";
        markBtn.disabled = true;

        if (doneMsg) {
            doneMsg.style.display = "block";
        }
    };
}