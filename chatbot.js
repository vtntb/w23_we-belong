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

  if (!chatToggle || !chatWindow || !closeChat || !chatForm || !userInput) {
    return;
  }

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

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = userInput.value.trim();
    if (text === "") return;

    addUserMessage(text, true);
    addBotReply(getBotReply(text), true);
    userInput.value = "";
  });
}

function addUserMessage(text, save = false) {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();

  if (save) {
    saveMessage("user", text);
  }
}

function addBotReply(text, save = false) {
  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();

  if (save) {
    saveMessage("bot", text);
  }
}

function sendQuickReply(text) {
  addUserMessage(text, true);
  addBotReply(getBotReply(text), true);
}

function getBotReply(input) {
  const text = input.toLowerCase();

  if (text.includes("sport")) {
    return "I can help you find a sport group. Please choose a sport or activity you are interested in.";
  }

  if (text.includes("join")) {
    return "To join, first choose an activity, then read the group details, and then use the contact form or sign-up button.";
  }

  if (text.includes("story")) {
    return "You can share your story in simple steps. We can guide you with prompts and easy questions.";
  }

  if (text.includes("coach") || text.includes("club")) {
    return "We can help clubs and coaches with inclusive communication, accessibility tips, and support resources.";
  }

  if (text.includes("tell me more")) {
    return "This chatbot only stores information when you give permission. It is designed to protect your privacy.";
  }

  if (text === "ok") {
    return "Great. What would you like help with today?";
  }

  return "Thanks for your message. I can help with joining activities, finding support, sharing stories, and helping clubs or coaches.";
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

  history.forEach((message) => {
    const msg = document.createElement("div");
    msg.className = message.sender === "user" ? "user-message" : "bot-message";
    msg.textContent = message.text;
    chatBody.appendChild(msg);
  });

  scrollToBottom();
}

function restoreChatWindowState() {
  const chatWindow = document.getElementById("chatWindow");
  const userInput = document.getElementById("userInput");
  if (!chatWindow) return;

  const isOpen = localStorage.getItem(CHAT_OPEN_KEY);
  if (isOpen === "true") {
    chatWindow.hidden = false;
    if (userInput) userInput.focus();
  } else {
    chatWindow.hidden = true;
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