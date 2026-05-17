const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SALT_ROUNDS = 10;

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  try {
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email.toLowerCase()]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const [result] = await db.query(
      "INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)",
      [firstName.trim(), lastName.trim(), email.toLowerCase().trim(), passwordHash]
    );

    const token = jwt.sign(
      { id: result.insertId, email: email.toLowerCase(), firstName: firstName.trim(), lastName: lastName.trim() },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
      message: "Account created successfully.",
      token,
      user: { id: result.insertId, firstName: firstName.trim(), lastName: lastName.trim(), email: email.toLowerCase() },
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
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email.toLowerCase().trim()]);

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Login successful.",
      token,
      user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

module.exports = router;
