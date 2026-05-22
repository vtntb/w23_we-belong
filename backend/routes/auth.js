const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SALT_ROUNDS = 10;

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    backupQuestion,
    backupAnswer
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !backupQuestion ||
    !backupAnswer
  ) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanBackupQuestion = backupQuestion.trim();
    const cleanBackupAnswer = backupAnswer.toLowerCase().trim();

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const backupAnswerHash = await bcrypt.hash(cleanBackupAnswer, SALT_ROUNDS);

    const [result] = await db.query(
      `INSERT INTO users 
       (first_name, last_name, email, password_hash, backup_question, backup_answer_hash)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        cleanFirstName,
        cleanLastName,
        cleanEmail,
        passwordHash,
        cleanBackupQuestion,
        backupAnswerHash
      ]
    );

    const token = jwt.sign(
      {
        id: result.insertId,
        email: cleanEmail,
        firstName: cleanFirstName,
        lastName: cleanLastName
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: {
        id: result.insertId,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: cleanEmail
      }
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter both email and password." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// POST /api/auth/check-reset-email
router.post("/check-reset-email", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please enter your email address." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();

    const [rows] = await db.query(
      `SELECT id, backup_question 
       FROM users 
       WHERE email = ?`,
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No account found with that email." });
    }

    if (!rows[0].backup_question) {
      return res.status(400).json({ error: "This account does not have a backup question set." });
    }

    res.json({
      message: "Email verified.",
      email: cleanEmail,
      backupQuestion: rows[0].backup_question
    });
  } catch (err) {
    console.error("Check reset email error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// POST /api/auth/reset-password
router.post("/reset-password", async (req, res) => {
  const { email, backupAnswer, newPassword } = req.body;

  if (!email || !backupAnswer || !newPassword) {
    return res.status(400).json({ error: "Please complete all fields." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  try {
    const cleanEmail = email.toLowerCase().trim();
    const cleanBackupAnswer = backupAnswer.toLowerCase().trim();

    const [rows] = await db.query(
      `SELECT id, backup_answer_hash 
       FROM users 
       WHERE email = ?`,
      [cleanEmail]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "No account found with that email." });
    }

    const user = rows[0];

    if (!user.backup_answer_hash) {
      return res.status(400).json({ error: "This account does not have a backup answer set." });
    }

    const answerMatch = await bcrypt.compare(cleanBackupAnswer, user.backup_answer_hash);

    if (!answerMatch) {
      return res.status(401).json({ error: "Backup answer is incorrect." });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    await db.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [newPasswordHash, user.id]
    );

    res.json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

module.exports = router;