// app.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch"); // Node <18
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY; // Hugging Face token
const MODEL = "gpt2-medium";     // Free hosted text-generation model

// Test route
app.get("/", (req, res) => {
  res.send("We Belong Hugging Face backend is running!");
});

// Chatbot endpoint
app.post("/get-ai-response", async (req, res) => {
  const query = req.body.query;

  // --- 1. Check if query exists ---
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  let response;
  try {
    // --- 2. Fetch from Hugging Face API ---
    response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: query })
    });
  } catch (err) {
    console.error("Network/fetch error:", err);
    return res.status(500).json({ error: "Network error while calling Hugging Face API" });
  }

  // --- 3. Check for non-200 status code ---
  if (!response.ok) {
    console.error("Hugging Face API returned status:", response.status);
    return res.status(response.status).json({ error: `Hugging Face API error: ${response.statusText}` });
  }

  let data;
  try {
    // --- 4. Parse JSON safely ---
    data = await response.json();
  } catch (err) {
    console.error("Invalid JSON returned from Hugging Face:", err);
    return res.status(500).json({ error: "Invalid JSON response from Hugging Face API" });
  }

  try {
    // --- 5. Extract generated text safely ---
    const answer = data[0]?.generated_text || "Sorry, I could not generate a response.";
    console.log("HF response:", answer);
    return res.json({ answer });
  } catch (err) {
    console.error("Error extracting answer:", err);
    return res.status(500).json({ error: "Error processing Hugging Face response" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));