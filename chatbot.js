const CHAT_STORAGE_KEY = "weBelongChatHistory";
const CHAT_OPEN_KEY = "weBelongChatOpen";

async function loadChatbot() {
  const container = document.getElementById("chatbot-container");
  if (!container) return;

  try {
    const response = await fetch("/chatbot.html");
    const html = await response.text();
    container.innerHTML = html;

    initChatbot();
    restoreChatHistory();
    restoreChatWindowState();
  } catch (error) {
    console.error("Failed to load chatbot:", error);
  }
}

function initChatbot() {
  const chatToggle = document.getElementById("chatToggle");
  const chatWindow = document.getElementById("chatWindow");
  const closeChat = document.getElementById("closeChat");
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");

  if (!chatToggle || !chatWindow || !closeChat || !chatForm || !userInput) return;

  chatWindow.hidden = true;

  chatToggle.addEventListener("click", () => {
    chatWindow.hidden = false;
    localStorage.setItem(CHAT_OPEN_KEY, "true");
    userInput.focus();
  });

  closeChat.addEventListener("click", () => {
    chatWindow.hidden = true;
    localStorage.setItem(CHAT_OPEN_KEY, "false");
  });

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    addUserMessage(text, true);
    userInput.value = "";

    addBotReply("Thinking...", false);

    const reply = await getAIReply(text);

    removeLastThinkingMessage();
    addBotReply(reply, true);
  });
}

function sendQuickReply(text) {
  const userInput = document.getElementById("userInput");
  if (userInput) userInput.value = "";

  addUserMessage(text, true);
  addBotReply("Thinking...", false);

  getAIReply(text).then(reply => {
    removeLastThinkingMessage();
    addBotReply(reply, true);
  });
}

async function getAIReply(message) {
  try {
    const response = await fetch("/get-ai-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query: message })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      return "Sorry, something went wrong with the chatbot server.";
    }

    return data.answer || "Sorry, I could not find an answer.";
  } catch (error) {
    console.error("Error from chatbot backend:", error);
    return "Sorry, something went wrong. Please try again.";
  }
}

function addUserMessage(text, save = false) {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = text;
  chatBody.appendChild(msg);

  scrollToBottom();

  if (save) saveMessage("user", text);
}

function addBotReply(text, save = false) {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);

  scrollToBottom();

  if (save) saveMessage("bot", text);
}

function removeLastThinkingMessage() {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const messages = chatBody.querySelectorAll(".bot-message");
  const last = messages[messages.length - 1];

  if (last && last.textContent === "Thinking...") {
    last.remove();
  }
}

function saveMessage(sender, text) {
  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];
  history.push({ sender, text });
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(history));
}

function restoreChatHistory() {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const history = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY)) || [];

  if (history.length === 0) return;

  chatBody.innerHTML = "";

  history.forEach(msg => {
    const div = document.createElement("div");
    div.className = msg.sender === "user" ? "user-message" : "bot-message";
    div.textContent = msg.text;
    chatBody.appendChild(div);
  });

  scrollToBottom();
}

function restoreChatWindowState() {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");

  if (!chatWindow) return;

  const isOpen = localStorage.getItem(CHAT_OPEN_KEY);
  chatWindow.hidden = isOpen !== "true";

  if (isOpen === "true" && userInput) {
    userInput.focus();
  }
}

function clearChatHistory() {
  localStorage.removeItem(CHAT_STORAGE_KEY);
  localStorage.removeItem(CHAT_OPEN_KEY);
  location.reload();
}

function scrollToBottom() {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  chatBody.scrollTop = chatBody.scrollHeight;
}

document.addEventListener("DOMContentLoaded", loadChatbot);