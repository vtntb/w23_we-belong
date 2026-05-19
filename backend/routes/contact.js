const express = require("express");
const db = require("../db");

const router = express.Router();

// POST /api/contact — save contact form message
router.post("/", async (req, res) => {
  const { firstName, lastName, phone, email, program, message } = req.body;

  if (!firstName || !lastName || !phone || !email) {
    return res.status(400).json({
      error: "First name, last name, phone, and email are required."
    });
  }

  try {
    await db.query(
      `INSERT INTO contact_messages 
       (first_name, last_name, phone, email, program, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, phone, email, program || null, message || null]
    );

    res.json({ message: "Contact message saved successfully." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;