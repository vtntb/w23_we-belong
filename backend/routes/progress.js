const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// GET /api/progress — get all progress for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT 
          p.course_id,
          p.is_enrolled,
          p.enrolled_at,
          c.title,
          c.description,
          c.course_url,
          c.total_lessons,
          COUNT(lp.id) AS completed_lessons
       FROM progress p
       JOIN courses c ON p.course_id = c.id
       LEFT JOIN lesson_progress lp 
          ON lp.user_id = p.user_id 
          AND lp.course_id = p.course_id
       WHERE p.user_id = ? 
          AND p.is_enrolled = TRUE
       GROUP BY 
          p.course_id,
          p.is_enrolled,
          p.enrolled_at,
          c.title,
          c.description,
          c.course_url,
          c.total_lessons`,
      [userId]
    );

    const progress = rows.map(course => {
      const completed = Number(course.completed_lessons);
      const total = Number(course.total_lessons);
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        courseId: course.course_id,
        title: course.title,
        description: course.description,
        courseUrl: course.course_url,
        totalLessons: total,
        completedLessons: completed,
        percent: percent,
        isEnrolled: course.is_enrolled
      };
    });

    res.json(progress);
  } catch (err) {
    console.error("Get progress error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/progress/complete-lesson — mark one lesson as completed
router.post("/complete-lesson", authenticateToken, async (req, res) => {
  const { courseId, lessonNumber } = req.body;
  const userId = req.user.id;

  if (!courseId || !lessonNumber) {
    return res.status(400).json({ error: "courseId and lessonNumber are required." });
  }

  try {
    const [enrolled] = await db.query(
      "SELECT id FROM progress WHERE user_id = ? AND course_id = ? AND is_enrolled = TRUE",
      [userId, courseId]
    );

    if (enrolled.length === 0) {
      return res.status(400).json({ error: "You are not enrolled in this course." });
    }

    await db.query(
      `INSERT IGNORE INTO lesson_progress (user_id, course_id, lesson_number)
       VALUES (?, ?, ?)`,
      [userId, courseId, lessonNumber]
    );

    res.json({ message: "Lesson completed." });
  } catch (err) {
    console.error("Complete lesson error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/progress/enrol — enrol logged-in user into a course
router.post("/enrol", authenticateToken, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ error: "courseId is required." });
  }

  try {
    await db.query(
      `INSERT INTO progress (user_id, course_id, is_enrolled)
       VALUES (?, ?, TRUE)
       ON DUPLICATE KEY UPDATE is_enrolled = TRUE`,
      [userId, courseId]
    );

    res.json({ message: "Enrolled successfully." });
  } catch (err) {
    console.error("Enrol error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// GET /api/progress/:courseId — get progress for one course
router.get("/:courseId", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.courseId;

  try {
    const [courseRows] = await db.query(
      "SELECT id, title, total_lessons FROM courses WHERE id = ?",
      [courseId]
    );

    if (courseRows.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }

    const course = courseRows[0];

    const [enrolledRows] = await db.query(
      "SELECT id FROM progress WHERE user_id = ? AND course_id = ? AND is_enrolled = TRUE",
      [userId, courseId]
    );

    const isEnrolled = enrolledRows.length > 0;

    const [lessonRows] = await db.query(
      `SELECT lesson_number 
       FROM lesson_progress 
       WHERE user_id = ? AND course_id = ?
       ORDER BY lesson_number`,
      [userId, courseId]
    );

    const completedLessons = lessonRows.map(row => row.lesson_number);
    const completedCount = completedLessons.length;
    const totalLessons = Number(course.total_lessons);
    const percent = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    res.json({
      courseId: course.id,
      title: course.title,
      isEnrolled: isEnrolled,
      completedLessons: completedLessons,
      completedCount: completedCount,
      totalLessons: totalLessons,
      percent: percent
    });
  } catch (err) {
    console.error("Get course progress error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;