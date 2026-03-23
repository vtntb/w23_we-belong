const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");

chatToggle.addEventListener("click", () => {
  chatWindow.hidden = false;
  userInput.focus();
});

closeChat.addEventListener("click", () => {
  chatWindow.hidden = true;
});

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = userInput.value.trim();
  if (text === "") return;

  addUserMessage(text);
  addBotReply(getBotReply(text));

  userInput.value = "";
});

function addUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

function addBotReply(text) {
  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  scrollToBottom();
}

function sendQuickReply(text) {
  addUserMessage(text);
  addBotReply(getBotReply(text));
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

  if (text.includes("ok")) {
    return "Great. What would you like help with today?";
  }

  return "Thanks for your message. I can help with joining activities, finding support, sharing stories, and helping clubs or coaches.";
}

function scrollToBottom() {
  chatBody.scrollTop = chatBody.scrollHeight;
}