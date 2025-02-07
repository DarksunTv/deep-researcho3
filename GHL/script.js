// Event listeners for button click and pressing "Enter"
document.getElementById("send-button").addEventListener("click", () => {
  processUserInput();
});

document.getElementById("user-input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    processUserInput();
  }
});

function processUserInput() {
  const inputField = document.getElementById("user-input");
  const userText = inputField.value.trim();

  if (!userText) {
    return;
  }

  // Display the user's message in the chat
  addMessage("user-message", userText);
  inputField.value = "";

  // Simulate sending data to backend and getting a response.
  simulateAIResponse(userText);
}

function addMessage(className, message) {
  const chatBody = document.getElementById("chat-body");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", className);
  messageDiv.textContent = message;
  chatBody.appendChild(messageDiv);
  scrollToBottom(chatBody);
}

function scrollToBottom(element) {
  element.scrollTop = element.scrollHeight;
}

function simulateAIResponse(userInput) {
  // Add typing indicator
  const chatBody = document.getElementById("chat-body");
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("message", "ai-message", "typing-indicator");
  typingIndicator.textContent = "Typing...";
  chatBody.appendChild(typingIndicator);
  scrollToBottom(chatBody);

  // Simulate delayed AI response with more meaningful content
  setTimeout(() => {
    // Remove typing indicator
    chatBody.removeChild(typingIndicator);
    
    // Process the user input and generate appropriate response
    let aiResponse;
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("phone number")) {
      aiResponse = "I apologize, but I cannot provide personal contact information like phone numbers. This is to protect individual privacy. Is there another way I can help you get in touch with the person you're looking for?";
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      aiResponse = "Hello! I'm here to help you with managing GHL workflows and related tasks. What would you like to do?";
    } else if (lowerInput.includes("workflow")) {
      aiResponse = "I can help you with workflows! Would you like to:\n- List existing workflows\n- Create a new workflow\n- Edit a workflow\n- Delete a workflow";
    } else {
      aiResponse = "I'm here to help with GHL workflow management. Could you please specify what you'd like to do with workflows? You can create, view, edit, or delete workflows.";
    }
    
    addMessage("ai-message", aiResponse);
  }, 1000);
} 