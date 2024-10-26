const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const chatbox = document.getElementById('chatbox');
const startButton = document.getElementById('startButton');
const chatContainer = document.getElementById('chatContainer');

// Questions grouped by categories
const questionsAndRoasts = {
    personalInfo: [
        { question: "What's your name?", category: 'name' },
        { question: "How old are you?", category: 'age' },
        { question: "Where are you from?", category: 'location' },
        { question: "What's your favorite color?", category: 'color' }
    ],
    hobbies: [
        { question: "What are your hobbies?", category: 'hobbies' },
        { question: "What do you like to do for fun?", category: 'hobbies' }
    ],
    lifestyle: [
        { question: "What's your favorite food?", category: 'food' },
        { question: "Are you a morning person or a night owl?", category: 'lifestyle' }
    ]
};

// Roast functions for each category
function roastName(name) {
    const roasts = [
        "Ah, " + name + ". That name sounds like it was picked from a 'most common names' list!",
        "Oh, " + name + "? I bet your name is in the top ten of the 'Most Popular' category.",
        "Wow, a name like " + name + "? Your parents must've really loved being basic!"
    ];
    return getRandomRoast(roasts);
}

function roastAge(age) {
    const roasts = [
        age + "? That's the perfect age to start lying about your age!",
        age + "? That's just a few years from being a 'classic' in the making!",
        "Oh, is that your age? I was guessing it was 'young at heart'!"
    ];
    return getRandomRoast(roasts);
}

function roastHobby(hobby) {
    const roasts = [
        hobby + "? That sounds like a great way to keep your social life non-existent!",
        "Ah, " + hobby + "! Perfect for when you want to impress... absolutely no one!",
        "Wow, hobbies. Are those your excuses for avoiding adulting?"
    ];
    return getRandomRoast(roasts);
}

function roastColor(color) {
    const roasts = [
        color + "? Such a vibrant choice! Are you planning to paint your life a little brighter?",
        color + "? Is that your way of saying you like bananas or something?",
        "Interesting choice! Are you trying to say you have a sunny disposition?"
    ];
    return getRandomRoast(roasts);
}

function roastFood(food) {
    const roasts = [
        food + "? Original! Can't go wrong with the crowd-pleaser!",
        food + "? A bold choice! Do you enjoy living life on the edge of cholesterol?",
        "Ah, " + food + "! Nothing says 'adventurous' like a classic snack!"
    ];
    return getRandomRoast(roasts);
}

// Get a random roast from an array
function getRandomRoast(roastArray) {
    return roastArray[Math.floor(Math.random() * roastArray.length)];
}

// Get a random question from any category
function getRandomQuestion() {
    const categories = Object.keys(questionsAndRoasts);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const questions = questionsAndRoasts[randomCategory];
    return questions[Math.floor(Math.random() * questions.length)];
}

// Handle the user's response based on the category
function handleUserResponse(answer) {
    if (!currentQuestion) return;

    let roast;
    switch (currentQuestion.category) {
        case 'name':
            roast = roastName(answer);
            break;
        case 'age':
            roast = roastAge(answer);
            break;
        case 'hobbies':
            roast = roastHobby(answer);
            break;
        case 'color':
            roast = roastColor(answer);
            break;
        case 'food':
            roast = roastFood(answer);
            break;
        default:
            roast = "That's an unexpected answer!";
    }

    // Display the roast and ask the next question
    chatbox.innerHTML += `<div class="bot">${roast}</div>`;
    currentQuestion = getRandomQuestion();
    chatbox.innerHTML += `<div class="bot">${currentQuestion.question}</div>`;
}

// Variables to track the conversation state
let currentQuestion = null;
let conversationStarted = false;

// Event listener for the Start button
startButton.addEventListener('click', () => {
    chatContainer.classList.remove('hidden'); // Show chat container
    currentQuestion = getRandomQuestion(); // Get the first question
    chatbox.innerHTML += `<div class="bot">${currentQuestion.question}</div>`; // Display first question
    conversationStarted = true; // Mark conversation as started
});

// Event listener for sending messages
sendButton.addEventListener('click', () => {
    const userText = userInput.value.trim();
    if (userText !== "") {
        chatbox.innerHTML += `<div class="user">${userText}</div>`;
        userInput.value = "";

        if (conversationStarted) {
            // Handle the user's response and continue the conversation
            handleUserResponse(userText);
        }

        chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
    }
});

// Allow sending messages with the Enter key
userInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        sendButton.click();
    }
});
