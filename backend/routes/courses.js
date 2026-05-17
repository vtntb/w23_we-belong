const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// GET /api/courses — get all courses (public)
router.get("/", async (req, res) => {
  try {
    const [courses] = await db.query("SELECT * FROM courses ORDER BY title");
    res.json(courses);
  } catch (err) {
    console.error("Get courses error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// GET /api/courses/:id — get single course with lessons (public)
router.get("/:id", async (req, res) => {
  try {
    const [courses] = await db.query("SELECT * FROM courses WHERE id = ?", [req.params.id]);
    if (courses.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }

    const [lessons] = await db.query(
      "SELECT * FROM lessons WHERE course_id = ? ORDER BY lesson_order",
      [req.params.id]
    );

    res.json({ ...courses[0], lessons });
  } catch (err) {
    console.error("Get course error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

// POST /api/courses/enroll — enroll logged-in user in a course
router.post("/enroll", authenticateToken, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required." });
  }

  try {
    const [courses] = await db.query("SELECT id FROM courses WHERE id = ?", [courseId]);
    if (courses.length === 0) {
      return res.status(404).json({ error: "Course not found." });
    }

    await db.query(
      "INSERT INTO progress (user_id, course_id, lessons_completed, is_enrolled) VALUES (?, ?, 0, TRUE) ON DUPLICATE KEY UPDATE is_enrolled = TRUE",
      [userId, courseId]
    );

    res.json({ message: "Enrolled successfully." });
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
