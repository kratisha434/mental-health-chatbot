const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

let chatHistory = []; // Store all messages

// Mood selection handling
function selectMood(mood) {
  document.getElementById("mood-selector").classList.add("hidden");
  chatBox.classList.remove("hidden");
  document.querySelector(".input-area").classList.remove("hidden");
  document.querySelector(".input-area").classList.add("flex-display");
  document.querySelector(".clear-btn-container").classList.remove("hidden");


  let greeting = "";

  if (mood.includes("Happy")) {
    greeting = "That's great! I'm glad to hear you're feeling good today 😊";
  } else if (mood.includes("Anxious")) {
    greeting = "It's okay to feel anxious. Let's talk about it 💬";
  } else if (mood.includes("Sad")) {
    greeting = "I'm here for you. You're not alone 💙";
  } else if (mood.includes("Angry")) {
    greeting = "Take a breath. Let’s try to calm those feelings together 😌";
  } else {
    greeting = "However you feel, I'm here with you today 🤝";
  }

  appendMessage("bot", greeting);
}

// Send message and trigger bot response
function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("user", input);
  userInput.value = "";

  setTimeout(() => {
    const response = getBotResponse(input.toLowerCase());
    appendMessage("bot", response);
  }, 500);
}

// Append message to chat and save to history
function appendMessage(sender, message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender;

  if (typeof message === "object") {
    msgDiv.innerHTML = `<strong>${sender === "user" ? "You" : "Bot"}:</strong> ${message.text}`;

    if (message.resource) {
      const resourceDiv = document.createElement("div");
      resourceDiv.className = "resource-card";
      resourceDiv.innerHTML = `<a href="${message.resource.url}" target="_blank">${message.resource.label}</a>`;
      msgDiv.appendChild(resourceDiv);
    }

    chatHistory.push({ sender, message }); // Save full object
  } else {
    msgDiv.textContent = `${sender === "user" ? "You" : "Bot"}: ${message}`;
    chatHistory.push({ sender, message }); // Save plain string
  }

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  saveChat(); // Save to LocalStorage
}

// Bot response logic
function getBotResponse(input) {
  if (input.includes("anxiety")) {
    return {
      text: "Anxiety can be tough. Try this calming video:",
      resource: {
        label: "Watch Guided Meditation",
        url: "https://www.youtube.com/watch?v=MIr3RsUWrdo"
      }
    };
  } else if (input.includes("sleep")) {
    return {
      text: "Having trouble sleeping? This might help:",
      resource: {
        label: "Listen to Sleep Music",
        url: "https://www.youtube.com/watch?v=1ZYbU82GVz4"
      }
    };
  } else if (input.includes("stress")) {
    return {
      text: "Here’s a short video on how to reduce stress:",
      resource: {
        label: "Watch Now",
        url: "https://www.youtube.com/watch?v=hnpQrMqDoqE"
      }
    };
  } else if (input.includes("sad") || input.includes("depressed") || input.includes("low")) {
    return {
      text: "I'm sorry you're feeling that way. Talking to someone or journaling might help. I'm here to listen."
    };
  } else if (input.includes("thank")) {
    return {
      text: "You're welcome! I'm always here to help. 😊"
    };
  } else {
    return {
      text: "I'm here to support you. Could you tell me more about how you're feeling?"
    };
  }
}

// Save chatHistory to LocalStorage
function saveChat() {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

// Load chat from LocalStorage on page load
function loadChat() {
  const saved = localStorage.getItem("chatHistory");
  if (!saved) return;

  chatHistory = JSON.parse(saved);
  document.querySelector(".clear-btn-container").classList.remove("hidden");


  // Show chat UI
  document.getElementById("mood-selector").classList.add("hidden");
  chatBox.classList.remove("hidden");
  document.querySelector(".input-area").classList.remove("hidden");
  document.querySelector(".input-area").classList.add("flex-display");

  // Replay messages
  chatHistory.forEach(entry => {
    appendMessage(entry.sender, entry.message);
  });
}

// Run on page load
window.onload = loadChat;

function clearChat() {
  localStorage.removeItem("chatHistory");
  chatHistory = [];
  chatBox.innerHTML = "";

  // Reset UI
  document.getElementById("mood-selector").classList.remove("hidden");
  chatBox.classList.add("hidden");
  document.querySelector(".input-area").classList.add("hidden");
  document.querySelector(".input-area").classList.remove("flex-display");
  document.querySelector(".clear-btn-container").classList.add("hidden");
}

