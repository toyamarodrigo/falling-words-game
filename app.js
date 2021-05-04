// HTTP GET LEVEL FROM index.html
let params = new URLSearchParams(window.location.search);
let LEVEL = params.get('lvl');

// DOM ELEMENTS
let buttonElementID = document.getElementById('StartButton');
let gameContentID = document.getElementById('GameContent');
let gameContentClass = document.getElementsByClassName('game-content');
let inputElementID = document.getElementById('InputWord');
let scoreElementID = document.getElementById('Score');
let scoreElementClass = document.getElementsByClassName('score');
let levelElementID = document.getElementById('Level');

// VARIABLES
const currentLevel = LEVEL;
let score = 0;
let gameOver = false;
let currentID = 0;
let arrWords = [];
let arrWordsDiv = [];
let topVal;
let gameWidth = gameContentID.clientWidth;
let gameHeight = gameContentID.clientHeight;

// SOUNDS
const startGameSound = document.getElementById('StartGameSound');
const gameoverSound = document.getElementById('GameoverSound');
const pointSound = document.getElementById('PointSound');
const notPointSound = document.getElementById('NotPointSound');

// DEFAULT VOLUME
startGameSound.style.zIndex = 1;
startGameSound.volume = 0.5;
gameoverSound.volume = 0.5;
pointSound.volume = 0.2;

// DICTIONARY WORDS
const DICTIONARY = [
  'generate',
  'review',
  'cultivate',
  'proud',
  'patience',
  'motivation',
  'wriggle',
  'ant',
  'falsify',
  'distribute',
  'vague',
  'pepper',
  'copper',
  'lie',
  'case',
  'expand',
  'absence',
  'football',
  'thread',
  'award',
  'tycoon',
  'still',
  'empirical',
  'doll',
  'dinner',
  'register',
  'proof',
  'script',
  'wrist',
  'sulphur',
  'selection',
  'slam',
  'grandmother',
  'assertive',
  'eaux',
  'admiration',
  'TRUE',
  'recognize',
  'roll',
  'bank',
  'reactor',
  'gradient',
  'ribbon',
  'pleasant',
  'path',
  'draft',
  'polish',
  'art',
  'hook',
  'flow',
  'operational',
  'transaction',
  'physics',
  'rally',
  'fold',
  'housewife',
  'suspicion',
  'craft',
  'objective',
  'grass',
  'reckless',
  'manual',
  'test',
  'switch',
  'silver',
  'take',
  'president',
  'constituency',
  'basis',
  'cluster',
  'psychology',
  'cat',
  'minimize',
  'hide',
  'chord',
  'brilliance',
  'official',
  'condition',
  'guideline',
  'apology',
  'general',
  'sock',
  'hunting',
  'kinship',
  'change',
  'departure',
  'mile',
  'ancestor',
  'cheat',
  'taxi',
  'tight',
  'moment',
  'dimension',
  'family',
  'projection',
  'demonstration',
  'pony',
  'standard',
  'appendix',
  'reluctance',
];

// GAME START
function init() {
  showLevel();
  setInterval(() => {
    if (!gameOver) {
      drawWord();
    }
  }, currentLevel);
  updateWordPosition();
}

// CREATE WORD, STORES IT IN AN ARRAY & STARTING POSITION WHERE IT FALLLS
function drawWord() {
  let word = generateRandomWord(DICTIONARY);
  arrWords.push(word);
  let wordDiv = document.createElement('div');
  wordDiv.innerHTML = `<p>${word}</p>`;
  wordDiv.classList.add('word');
  wordDiv.style.top = '-2px';
  wordDiv.style.zIndex = '1';
  wordDiv.style.left = (Math.random() * (gameWidth - 150)).toString() + 'px';
  arrWordsDiv.push(wordDiv);
  gameContentClass[0].appendChild(wordDiv);
}

// GET RANDOM WORD FROM DICTIONARY
function generateRandomWord(words) {
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
}

// GET VALUE FROM INPUT
function getWord() {
  let inputValue = inputElementID.value.toLowerCase();
  inputElementID.value = '';
  if (arrWords.includes(inputValue)) {
    updateScore();
    let indexWord = arrWords.indexOf(inputValue);
    let wordDivIndex = arrWordsDiv[indexWord];
    arrWords.splice(indexWord, 1);
    arrWordsDiv.splice(indexWord, 1);
    wordDivIndex.parentNode.removeChild(wordDivIndex);
    playSound(pointSound, 0);
  } else {
    playSound(notPointSound, 0);
  }
}

// FALLING WORD LOGIC + GAMEOVER
function updateWordPosition() {
  setInterval(() => {
    if (!gameOver) {
      let wordText = document.getElementsByClassName('word');
      for (let i = 0; i < arrWords.length; i++) {
        if (parseInt(topVal) + 15 > gameHeight) {
          gameOver = true;
          gameContentID.innerHTML = modalGameOver();
          playSound(gameoverSound, 8, startGameSound);
          gameoverSound.style.zIndex = 1;
          inputElementID.setAttribute('disabled', true);
        } else {
          topVal = wordText[i].style.top;
          topVal.replace('px', '');
          wordText[i].style.top = (parseInt(topVal) + 1).toString() + 'px';
        }
      }
    }
  }, 20);
}

// UPDATE SCORE
function updateScore() {
  score += 10;
  scoreElementID.innerHTML = `<p>Score ${score}</p>`;
}

// HELPERS
// PLAY SOUND
function playSound(sound, time, stopSound) {
  console.log(stopSound)
  stopSound.pause();
  stopSound.currentTime = 0;
  sound.pause();
  sound.currentTime = time;
  sound.play();
}

// SHOWS CURRENT PLAYING LEVEL
function showLevel() {
  if (LEVEL === '3000') {
    levelElementID.innerHTML = `<p>Level: EASY</p>`;
  } else if (LEVEL === '2000') {
    levelElementID.innerHTML = `<p>Level: MEDIUM</p>`;
  } else {
    levelElementID.innerHTML = `<p>Level: HARD</p>`;
  }
}

// GAMEOVER MODAL
function modalGameOver() {
  return `
    <div class="modal-gameover col-8">
      <h1> Game Over </h2>
      <h2> Score: ${score} </h2>
      <button id="Restart" class="my-2 btn-modal">
        <a href="game.html?lvl=${currentLevel}">
          <h6>Restart</h6>
        </a>
      </button>
      <button id="Menu" class="my-2 btn-modal">
        <a href="index.html">
          <h6>Back to menu</h6>
        </a>
      </button>
    </div>
  `;
}

init();
