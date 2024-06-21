'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.newGame');
const btnRoll = document.querySelector('.rollDice');
const btnHold = document.querySelector('.hold');

let scores, currentScore, activePlayer, playing;

const switchPlayer = function() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  console.log(activePlayer)
  currentScore = 0;    
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};


// Starting conditions
 const init = function(){
 scores = [0, 0]
 currentScore = 0;
 activePlayer = 0;
 playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.add('player--active');
};


init();

// Rolling dice fuctionality
btnRoll.addEventListener('click', function(){
  
  if(playing === true){
  
  // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
  // 2. disflay dice
    diceEl.classList.remove('hidden') ;
    diceEl.src = `./img/dice-${dice}.png`;
  // 3. Check for the roll 1: if true, switch to next player
    if(dice !== 1){
     //  add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else {
    // siwtch to next player
      switchPlayer();
    }
}});



btnHold.addEventListener('click', function(){
  if(playing === true){
  // 1. Add current store to active player's score
   scores[activePlayer] += currentScore;
   document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
   
  // 2. Check if player's score is >= 1000
    if(scores[activePlayer] >= 20){
      // Finish
      playing = false;
      diceEl.classList.add('hidden') ;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
      switchPlayer();
    }
    //  Switch to the next player
    switchPlayer();
}});

btnNew.addEventListener('click', init);

