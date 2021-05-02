const LEVELS = {
  EASY: 3000,
  MEDIUM: 2000,
  HARD: 1000,
};

const WORDS_CONFIG = {
  positionX: 0,
  positionY: 0,
};

// DOM ELEMENTS
let buttonElementID = document.getElementById('StartButton');
let gameContentID = document.getElementById('GameContent');
let gameContentClass = document.getElementsByClassName('game-content');
let inputElementID = document.getElementById('InputWord');
let scoreElementID = document.getElementById('Score');
let scoreElementClass = document.getElementsByClassName('score');

// VARIABLES
const currentLevel = LEVELS.EASY;
let score = 0;
let gameOver = false;
let currentID = 0;
let arrWords = [];
let arrWordsDiv = [];
let topVal;
let gameWidth = gameContentID.clientWidth;
let gameHeight = gameContentID.clientHeight;

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

// INICIO JUEGO
function init() {
  createWord();
  updateWordPosition();
}

function createWord() {
  setInterval(() => {
    if (!gameOver) {
      drawWord();
    }
  }, 100);
}

function generateRandomWord(words) {
  var word = words[Math.floor(Math.random() * words.length)];
  return word;
}

function drawWord() {
  let word = generateRandomWord(DICTIONARY);
  arrWords.push(word);
  let wordDiv = document.createElement('div');
  wordDiv.innerHTML = `<p>${word}</p>`;
  wordDiv.classList.add('word');
  wordDiv.style.top = '5px';
  wordDiv.style.zIndex = '1';
  wordDiv.style.left = (Math.random() * (gameWidth - 70)).toString() + 'px';
  arrWordsDiv.push(wordDiv);
  gameContentClass[0].appendChild(wordDiv);
}

function updateWordPosition() {
  setInterval(() => {
    if (!gameOver) {
      let wordText = document.getElementsByClassName('word');
      for (let i = 0; i < arrWords.length; i++) {
        if (parseInt(topVal) + 10 > gameHeight) {
          gameOver = true;
          gameContentID.innerHTML = `<h1> Game Over </h2><h2>Score: ${score} </h2>`;
        } else {
          topVal = wordText[i].style.top;
          topVal.replace('px', '');
          wordText[i].style.top = (parseInt(topVal) + 1).toString() + 'px';
        }
      }
    }
  }, 20);
}

function updateScore() {
  score += 10;
  scoreElementID.innerHTML = `<p>Score: ${score}</p>`;
}

function getWord() {
  let inputValue = inputElementID.value;
  inputElementID.value = '';
  if (arrWords.includes(inputValue)) {
    updateScore();
    let indexWord = arrWords.indexOf(inputValue);
    let wordDivIndex = arrWordsDiv[indexWord];
    arrWords.splice(indexWord, 1);
    arrWordsDiv.splice(indexWord, 1);
    wordDivIndex.parentNode.removeChild(wordDivIndex);
  }
}

init();
