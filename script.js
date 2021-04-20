const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for the game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'shiny',
    'juice',
    'wardrobe',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'revive',
    'admit',
    'drag',
    'loving',
    'people',
    'galaxy',
    'luxury',
    'lucky',
    'syndrome',
    'jackpot',
    'crocodile',
    'coffee',
    'jelly',
    'rhythm',
    'guitar',
    'chair',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value 
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start 
text.focus();

// Start counting down 
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM () {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score 
function updateScore () {
    score++;
    scoreEl.innerHTML = score;
}

// Update time 
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

// Game over, show endscreen 
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Oops...Time Ran Out!</h1>
    <p>Your Final Score is ${score}</p>
    <button onclick="location.reload()">Restart Game</button>
    `;

    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event Listeners

// Typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if(insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        // Clear text
        e.target.value = '';

        if(difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        } else {
            time += 4;
        }

        updateTime();
    }
});

// Settings button click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});