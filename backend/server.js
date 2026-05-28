require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const progressRoutes = require("./routes/progress");
const chatbotRoutes = require("./routes/chatbot");
const contactRoutes = require("./routes/contact")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (req.path.endsWith(".html")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }

  next();
});

// Serve the frontend static files
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/contact", contactRoutes);

// Return 404 JSON for unknown API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});

// Catch-all: serve main page for any other unmatched route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "mainpage.html"));
});

app.listen(PORT, () => {
  console.log(`We Belong server running at http://localhost:${PORT}`);
});
