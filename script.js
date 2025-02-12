let chatStarted = false;
let lastBotResponse = "";

function addMessage(content, className) {
    const chatWindow = document.getElementById("chat-window");
    const messageElement = document.createElement("div");
    messageElement.className = className;
    messageElement.textContent = content;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function botReply(message) {
    const lowerCaseMessage = message.toLowerCase().trim();

    if (["hi", "hello", "hey", "good morning", "good evening", "hi bot"].includes(lowerCaseMessage)) {
        lastBotResponse = "Hello! How can I assist you today? 😊";
    } else if (lowerCaseMessage === "end chat") {
        resetChat();
        return;
    } else {
        const botResponses = {
            "what is a chatbot": "A chatbot simulates human conversation and can assist with customer support or automate tasks.",
            "how to train a chatbot": "Train a chatbot by defining intents, providing training data, and using NLP frameworks like Dialogflow.",
            "what is natural language processing": "Natural Language Processing (NLP) is a field of AI that enables machines to understand and respond to human language.",
            "how do i deploy a chatbot": "Deploy a chatbot on platforms like websites, WhatsApp, or Telegram using APIs or SDKs.",
            "what are intents in chatbot": "Intents are the goals or purposes behind a user's input, helping the bot understand what the user wants.",
            "how do i test my chatbot": "Test your chatbot by simulating user interactions and checking if it responds correctly to various inputs.",
            "what is machine learning": "Machine learning is a subset of AI that allows systems to learn from data and improve over time without explicit programming.",
            "how do i improve my chatbot": "Improve your chatbot by analyzing user interactions, updating responses, and training it with more data.",
            "what is a conversational interface": "A conversational interface allows users to interact with a system through natural language, like chat or voice.",
            "how do chatbots understand language": "Chatbots understand language using NLP techniques to analyze and interpret user input.",
            "what are some popular chatbot platforms": "Popular chatbot platforms include Dialogflow, Rasa, Microsoft Bot Framework, and IBM Watson.",
            "what is the future of chatbots": "The future of chatbots includes more advanced AI, better understanding of context, and wider adoption across industries.",
            "what are the limitations of chatbots": "Limitations of chatbots include difficulty understanding complex queries and lack of emotional intelligence."
        };

        if (botResponses[lowerCaseMessage]) {
            lastBotResponse = botResponses[lowerCaseMessage];
        } else {
            lastBotResponse = "Sorry,I'm not sure how to respond to that. Try asking form given options:";
            setTimeout(() => {
                addMessage(lastBotResponse, "bot-message");
                addQuestionButtons(Object.keys(botResponses));
            }, 500);
            return;
        }
    }

    setTimeout(() => {
        addMessage(lastBotResponse, "bot-message");
    }, 500);
}

function addQuestionButtons(questions) {
    const chatWindow = document.getElementById("chat-window");
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.flexWrap = "wrap";
    buttonContainer.style.marginTop = "5px";

    questions.forEach((text) => {
        const button = document.createElement("button");
        button.textContent = `📌 ${text}`;
        button.style.margin = "5px";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.borderRadius = "5px";
        button.style.border = "none";
        button.style.backgroundColor = "#007bff";
        button.style.color = "white";
        button.style.transition = "background-color 0.3s ease, transform 0.2s ease";
        button.style.flex = "1 1 200px"; 
        button.style.textAlign = "left";

        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = "#0056b3";
            button.style.transform = "scale(1.05)";
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = "#007bff";
            button.style.transform = "scale(1)";
        });

        button.addEventListener("click", () => {
            addMessage(text, "user-message");
            botReply(text);
        });

        buttonContainer.appendChild(button);
    });

    chatWindow.appendChild(buttonContainer);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function resetChat() {
    const chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML = "";
    chatStarted = false;
    lastBotResponse = "";
    updateEndChatButton();
    const resetMessage = document.createElement("div");
    resetMessage.className = "bot-message";
    resetMessage.textContent = "Chat has been reset. Please ask a question.";
    chatWindow.appendChild(resetMessage);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
        if (chatWindow.contains(resetMessage)) {
            chatWindow.removeChild(resetMessage);
        }
    }, 1000);
}
function updateEndChatButton() {
    const endChatButton = document.getElementById("end-chat-button");
    endChatButton.style.display = chatStarted ? "inline-block" : "none";
}

document.getElementById("send-button").addEventListener("click", () => {
    const userMessage = document.getElementById("user-input").value;
    if (userMessage.trim() !== "") {
        addMessage(userMessage, "user-message");

        if (!chatStarted) {
            chatStarted = true;
            updateEndChatButton();
        }

        botReply(userMessage);
        document.getElementById("user-input").value = "";
    }
});

document.getElementById("user-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("send-button").click();
    }
});

document.getElementById("end-chat-button").addEventListener("click", resetChat);