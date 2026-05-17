require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");
const levenshtein = require("fast-levenshtein");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const db = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "we_belong",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/", (req, res) => {
  res.send("We Belong backend is running with MySQL chatbot.");
});

function normaliseText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // remove punctuation like ? ! .
    .replace(/\s+/g, " ")    // remove extra spaces
    .trim();
}

function similarity(a, b) {
  const distance = levenshtein.get(a, b);
  const maxLength = Math.max(a.length, b.length);

  if (maxLength === 0) return 1;

  return 1 - distance / maxLength;
}

function emergencyFallback(query) {
  const emergencyWords = [
    "hurt myself",
    "kill myself",
    "suicide",
    "self harm",
    "emergency",
    "medical emergency"
  ];

  return emergencyWords.some(word => query.includes(word));
}

function outOfScopeFallback(query) {
  const badWords = [
    "hack",
    "malware",
    "weapon",
    "drug",
    "casino",
    "betting"
  ];

  return badWords.some(word => query.includes(word));
}

async function saveChatLog(userQuery, botResponse, matchedFaqId = null) {
  try {
    await db.query(
      "INSERT INTO chatbot_logs (user_query, bot_response, matched_faq_id) VALUES (?, ?, ?)",
      [userQuery, botResponse, matchedFaqId]
    );
  } catch (error) {
    console.error("Failed to save chatbot log:", error);
  }
}

app.post("/get-ai-response", async (req, res) => {
  const originalQuery = req.body.query;

  if (!originalQuery || originalQuery.trim() === "") {
    return res.status(400).json({ error: "Query is required" });
  }

  const query = normaliseText(originalQuery);

  try {
    if (emergencyFallback(query)) {
      const answer =
        "I am sorry you are feeling this way. If you are in immediate danger, call emergency services now. In Australia, call 000. You can also contact Lifeline on 13 11 14.";

      await saveChatLog(originalQuery, answer, null);
      return res.json({ answer });
    }

    if (outOfScopeFallback(query)) {
      const answer =
        "I cannot help with that. I can only help with We Belong, disability awareness, accessibility, learning resources, registration, and contact information.";

      await saveChatLog(originalQuery, answer, null);
      return res.json({ answer });
    }

    const [allFaqs] = await db.query(
      "SELECT id, question, answer, keywords FROM chatbot_faqs"
    );

    let bestMatch = null;
    let bestScore = 0;

    allFaqs.forEach(faq => {
      const normalQuestion = normaliseText(faq.question);
      const normalKeywords = normaliseText(faq.keywords || "");

      const questionScore = similarity(query, normalQuestion);

      const keywordScores = normalKeywords
        .split(",")
        .map(keyword => similarity(query, normaliseText(keyword)));

      const keywordScore = keywordScores.length > 0 ? Math.max(...keywordScores) : 0;

      const score = Math.max(questionScore, keywordScore);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    });

    if (bestMatch && bestScore >= 0.72) {
      const answer = bestMatch.answer;
      await saveChatLog(originalQuery, answer, bestMatch.id);
      return res.json({ answer });
    }

    const [rows] = await db.query(
      `SELECT id, answer
       FROM chatbot_faqs
       WHERE LOWER(question) LIKE ?
          OR LOWER(keywords) LIKE ?
          OR ? LIKE CONCAT('%', LOWER(question), '%')
       LIMIT 1`,
      [`%${query}%`, `%${query}%`, query]
    );

    if (rows.length > 0) {
      const answer = rows[0].answer;
      await saveChatLog(originalQuery, answer, rows[0].id);
      return res.json({ answer });
    }

    const fallback =
      "I can help with We Belong, disability awareness, accessibility, courses, registration, and contact information. Please ask me about one of those topics.";

    await saveChatLog(originalQuery, fallback, null);
    return res.json({ answer: fallback });

  } catch (error) {
    console.error("Chatbot backend error:", error);
    return res.status(500).json({
      error: "Server error while processing chatbot request"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});