const express = require("express");
const db = require("../db");

const router = express.Router();

// Emergency/safety keywords — always checked first
const EMERGENCY_KEYWORDS = ["urgent", "emergency", "crisis", "kill", "suicide", "harm", "die", "dying"];
const EMERGENCY_RESPONSE =
  "If you need urgent support, please contact emergency services (000 in Australia) or a trusted support person immediately. We Belong is not a crisis service. You can also call Lifeline on 13 11 14.";

function getFaqReply(input, faqs) {
  const text = input.toLowerCase();

  // Check emergency first
  if (EMERGENCY_KEYWORDS.some((kw) => text.includes(kw))) {
    return EMERGENCY_RESPONSE;
  }

  // Match against FAQ keywords
  for (const faq of faqs) {
    const keywords = (faq.keywords || "").split(",").map((k) => k.trim().toLowerCase());
    if (keywords.some((kw) => kw && text.includes(kw))) {
      return faq.answer;
    }
  }

  return null;
}

function getRuleBasedReply(input) {
  const text = input.toLowerCase();

  if (text.includes("sport")) return "I can help you find a sport group. Please choose a sport or activity you are interested in.";
  if (text.includes("join")) return "To join, first choose an activity, then read the group details, and use the contact form or sign-up button.";
  if (text.includes("story")) return "You can share your story in simple steps. We can guide you with prompts and easy questions.";
  if (text.includes("coach") || text.includes("club")) return "We can help clubs and coaches with inclusive communication, accessibility tips, and support resources.";
  if (text === "ok") return "Great. What would you like help with today?";

  return "Thanks for your message. I can help with joining activities, finding support, sharing stories, and helping clubs or coaches.";
}

// POST /api/chatbot/message
router.post("/message", async (req, res) => {
  const { message, userId } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const [faqs] = await db.query("SELECT * FROM chatbot_faqs");

    let reply = getFaqReply(message, faqs);
    if (!reply) {
      reply = getRuleBasedReply(message);
    }

    // Save to chatbot_logs
    await db.query(
      "INSERT INTO chatbot_logs (user_query, bot_response, matched_faq_id) VALUES (?, ?, ?)",
      [message.trim(), reply, null]
    );

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
