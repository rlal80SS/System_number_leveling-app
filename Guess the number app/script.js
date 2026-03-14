// let targetNumber;
// let maxRange;

// const feedback = document.getElementById('feedback');
// const gameplaySection = document.getElementById('gameplay-section');
// const guessInput = document.getElementById('guessInput');
// const instruction = document.getElementById('instruction');

// /**
//  * Changes the difficulty mode and triggers CSS animations
//  */
// function setMode(mode) {
//     // Reset any previous animation classes
//     document.body.classList.remove('easy-mode', 'medium-mode', 'hard-mode');
    
//     // Tiny delay to ensure the browser registers the class removal/addition for transition
//     setTimeout(() => {
//         document.body.classList.add(`${mode}-mode`);
//     }, 10);

//     // Set Range
//     if (mode === 'easy') maxRange = 10;
//     else if (mode === 'medium') maxRange = 50;
//     else if (mode === 'hard') maxRange = 100;

//     // Generate random number
//     targetNumber = Math.floor(Math.random() * maxRange) + 1;
    
//     // Update UI
//     instruction.innerText = `Guess a number between 1 and ${maxRange}`;
//     gameplaySection.style.display = 'block';
//     feedback.innerText = "Good luck!";
//     guessInput.value = '';
//     guessInput.focus();
// }

// /**
//  * Handles the logic for checking the guess
//  */
// document.getElementById('guessBtn').addEventListener('click', () => {
//     const userGuess = parseInt(guessInput.value);

//     if (!userGuess || userGuess < 1 || userGuess > maxRange) {
//         feedback.innerText = "Enter a valid number within range!";
//         return;
//     }

//     if (userGuess === targetNumber) {
//         feedback.innerHTML = "<strong>⭐ YES! That's the one! ⭐</strong>";
//         feedback.style.color = "#fff";
//         // Visual success: slightly pulse the card
//         document.querySelector('.game-container').style.transform = "scale(1.05)";
//     } else {
//         feedback.innerText = userGuess > targetNumber ? "Lower! ↓" : "Higher! ↑";
        
//         // Add shake animation for wrong guess
//         guessInput.classList.add('shake');
//         setTimeout(() => guessInput.classList.remove('shake'), 400);
//     }
// });

// /**
//  * Dark Mode Toggle
//  */
// document.getElementById('darkModeToggle').addEventListener('change', (e) => {
//     if (e.target.checked) {
//         document.body.classList.add('dark');
//     } else {
//         document.body.classList.remove('dark');
//     }
// });

// /**
//  * Reset Game
//  */
// document.getElementById('resetBtn').addEventListener('click', () => {
//     document.body.classList.remove('easy-mode', 'medium-mode', 'hard-mode');
//     gameplaySection.style.display = 'none';
//     instruction.innerText = "Select a difficulty to start!";
//     feedback.innerText = "";
// });

let targetNumber;
let attempts = 0;
let maxRange;

const feedback = document.getElementById('feedback');
const attemptDisplay = document.getElementById('attemptCount');
const rankBadge = document.getElementById('rankBadge');
const container = document.getElementById('mainContainer');

function setMode(mode) {
    // 1. Reset System
    document.body.classList.remove('easy-mode', 'medium-mode', 'hard-mode');
    container.classList.remove('win-pulse');
    attempts = 0;
    attemptDisplay.innerText = attempts;
    
    // 2. Trigger "Power-up" Transition
    setTimeout(() => {
        document.body.classList.add(`${mode}-mode`);
    }, 50);

    // 3. Define Rank Properties
    if (mode === 'easy') {
        maxRange = 10;
        rankBadge.innerText = "RANK: E";
        rankBadge.style.color = "var(--system-blue)";
    } else if (mode === 'medium') {
        maxRange = 50;
        rankBadge.innerText = "RANK: B";
        rankBadge.style.color = "var(--system-gold)";
    } else {
        maxRange = 100;
        rankBadge.innerText = "RANK: S";
        rankBadge.style.color = "var(--system-red)";
    }

    // 4. Initialize Quest
    targetNumber = Math.floor(Math.random() * maxRange) + 1;
    document.getElementById('instruction').innerText = `QUEST: IDENTIFY VALUE (1-${maxRange})`;
    document.getElementById('gameplay-section').classList.remove('hidden');
    feedback.innerText = "SYSTEM SYNCHRONIZED...";
}

document.getElementById('guessBtn').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guessInput').value);
    
    if (isNaN(guess)) return;

    attempts++;
    attemptDisplay.innerText = attempts;

    if (guess === targetNumber) {
        feedback.innerHTML = "<span style='color:lime'>QUEST COMPLETED. LEVEL UP!</span>";
        container.classList.add('win-pulse');
    } else {
        // Feedback based on distance
        feedback.innerText = guess > targetNumber ? "ALERT: VALUE TOO HIGH" : "ALERT: VALUE TOO LOW";
        
        // Damage/Shake effect
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 200);
    }
});

// Dark Mode Switch
document.getElementById('darkModeToggle').addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
});

// Reset
document.getElementById('resetBtn').addEventListener('click', () => {
    location.reload();
});