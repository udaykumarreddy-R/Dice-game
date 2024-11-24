// Select elements from the DOM to control the game interface
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const currentScoreDisplay1 = document.querySelector('#current--0');
const currentScoreDisplay2 = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdScoreButton = document.querySelector('.btn--hold');
let scores = [0, 0];          
let currentScore = 0;         
let activePlayer = 0;        
let isGameActive = true;       
// Function to reset and start a new game
function startNewGame() {
  scores = [0, 0];           
  currentScore = 0;         
  activePlayer = 0;            
  isGameActive = true;        
  score1.textContent = 0;
  score2.textContent = 0;
  currentScoreDisplay1.textContent = 0;
  currentScoreDisplay2.textContent = 0;
  diceImage.classList.add('hidden'); 
  player1.classList.add('player--active'); 
  player2.classList.remove('player--active'); 
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner'); 
}
// Switch to the next player
function switchToNextPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}
// roll the dice 
function rollDice() {
  if (!isGameActive) return;
    // Get a random dice roll between 1 and 6
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceImage.classList.remove('hidden');
  diceImage.src = `./images/dice-${dice}.png`;
    // If the dice roll is not a 1, add the value to the current score
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
  } else {
     // If the dice roll is 1, switch to the next player
    switchToNextPlayer();
  }
}
//hold the score
function holdScore() {
  if (!isGameActive) return;
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];
   // Check if the active player's score has reached or not
  if (scores[activePlayer] >= 20) {
    endGame();
  } else {
    //  switch to the next player
    switchToNextPlayer();
  }
}
// game over
function endGame() {
  isGameActive = false;
  diceImage.classList.add('hidden'); 
  document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
}
//add event listeners for the buttons 
rollDiceButton.addEventListener('click', rollDice);
holdScoreButton.addEventListener('click', holdScore);
newGameButton.addEventListener('click', startNewGame);
// start the game
startNewGame();

