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

function getEnrollKey(courseId) {
    return courseId + "_enrolled";
}

function getLessonsKey(courseId) {
    return courseId + "_completedLessons";
}

function isEnrolled(courseId) {
    return localStorage.getItem(getEnrollKey(courseId)) === "true";
}

function setEnrolled(courseId, value) {
    localStorage.setItem(getEnrollKey(courseId), value ? "true" : "false");
}

function getCompletedLessons(courseId) {
    const raw = localStorage.getItem(getLessonsKey(courseId));
    if (!raw) return [];

    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function setCompletedLessons(courseId, lessons) {
    localStorage.setItem(getLessonsKey(courseId), JSON.stringify(lessons));
}

function markLessonComplete(courseId, lessonNumber) {
    const completed = getCompletedLessons(courseId);

    if (!completed.includes(lessonNumber)) {
        completed.push(lessonNumber);
        completed.sort((a, b) => a - b);
        setCompletedLessons(courseId, completed);
    }
}

function getProgressPercent(courseId, totalLessons) {
    const done = getCompletedLessons(courseId).length;
    if (totalLessons === 0) return 0;
    return Math.round((done / totalLessons) * 100);
}

/* ===== COURSE PAGE ===== */
function initCoursePage() {
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

    function updateProgressUI() {
        const completedCount = getCompletedLessons(courseId).length;
        const percent = getProgressPercent(courseId, totalLessons);

        if (progressWrap) progressWrap.style.display = "block";
        if (progressFill) progressFill.style.width = percent + "%";
        if (progressText) progressText.textContent = `${completedCount}/${totalLessons} lessons completed`;
        if (progressBadge) {
            progressBadge.textContent = percent === 100 ? "COMPLETED" : "IN PROGRESS";
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

    if (!isEnrolled(courseId)) {
        status.innerText = "NOT ENROLLED";
        status.className = "status not-enrolled";

        btn.innerText = "Enroll Now";
        btn.onclick = function () {
            setEnrolled(courseId, true);
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
    const completedLessons = getCompletedLessons(courseId);

    lessons.forEach((lesson, index) => {
        const lessonNumber = index + 1;

        if (completedLessons.includes(lessonNumber)) {
            lesson.classList.add("completed");
        }
    });

    updateProgressUI();
}

/* ===== LESSON PAGE ===== */
function initLessonPage() {
    if (document.body.dataset.pageType !== "lesson") return;

    const courseId = getCourseId();
    const lessonNumber = getLessonNumber();

    const markBtn = document.getElementById("markCompleteBtn");
    const doneMsg = document.getElementById("lessonDoneMsg");

    if (!markBtn || !courseId || !lessonNumber) return;

    if (!isLoggedIn() || !isEnrolled(courseId)) {
        markBtn.innerText = "Enroll to Access";
        markBtn.disabled = true;
        return;
    }

    const completed = getCompletedLessons(courseId);
    const alreadyCompleted = completed.includes(lessonNumber);

    if (alreadyCompleted) {
        markBtn.innerText = "Completed";
        markBtn.disabled = true;
        if (doneMsg) doneMsg.style.display = "block";
        return;
    }

    markBtn.onclick = function () {
        markLessonComplete(courseId, lessonNumber);
        markBtn.innerText = "Completed";
        markBtn.disabled = true;
        if (doneMsg) doneMsg.style.display = "block";
    };
}