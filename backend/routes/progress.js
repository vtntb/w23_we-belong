const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// GET /api/progress — get all progress for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.course_id, p.lessons_completed, p.is_enrolled, p.enrolled_at,
              c.title, c.total_lessons
       FROM progress p
       JOIN courses c ON p.course_id = c.id
       WHERE p.user_id = ? AND p.is_enrolled = TRUE`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error("Get progress error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/progress/update — update lesson progress for the logged-in user
router.post("/update", authenticateToken, async (req, res) => {
  const { courseId, lessonsCompleted } = req.body;
  const userId = req.user.id;

  if (!courseId || lessonsCompleted === undefined) {
    return res.status(400).json({ error: "courseId and lessonsCompleted are required." });
  }

  try {
    const [existing] = await db.query(
      "SELECT id FROM progress WHERE user_id = ? AND course_id = ?",
      [userId, courseId]
    );

    if (existing.length === 0) {
      return res.status(400).json({ error: "You are not enrolled in this course." });
    }

    await db.query(
      "UPDATE progress SET lessons_completed = ? WHERE user_id = ? AND course_id = ?",
      [lessonsCompleted, userId, courseId]
    );

    res.json({ message: "Progress updated." });
  } catch (err) {
    console.error("Update progress error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
