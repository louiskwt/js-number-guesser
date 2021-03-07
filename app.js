/**
 * Game Function:
 * Plater must guess a number between a min and max
 * Plater gets 3 guesses
 * Notify player of guesses remaining
 * Notify plater of the correct answer if loose
 * Let plater choose to play again
 */

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft =3;

// UI elements
const gameUI = document.querySelector('#game'),
      minNumUI = document.querySelector('.min-num'),
      maxNumUI = document.querySelector('.max-num'),
      guessBtnUI = document.querySelector('#guess-btn'),
      guessInputUI = document.querySelector('#guess-input'),
      messageUI= document.querySelector('.message');

// Assign UI min and max
minNumUI.textContent = min;
maxNumUI.textContent = max;

// Listen for guess
guessBtnUI.addEventListener('click', function() {
    let guess = parseInt(guessInputUI.value);
    console.log(isNaN(guess));
    // validate input
    if(isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else if(guess === winningNum) {
        // Winning case
        gameOver(true, `${winningNum} is correct! You win!`);
    } else {
        // Wrong number
        guessesLeft -= 1;
        
        // Losing case
        if(guessesLeft === 0) {
            // game over
            gameOver(false, `Game over! You lost! The correct number was ${winningNum}.`);
        } else {
            // game continue
            // change border color
            guessInputUI.style.borderColor = "red";
            // Update message
            setMessage(`${guess} is not correct! ${guessesLeft} guess left`, 'red');
            guessInputUI.value = '';
        }
    }
})

// Play again Event listener
gameUI.addEventListener('mousedown', (e) => {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

// Get winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message
function setMessage(msg, color) {
    messageUI.style.color = color;
    messageUI.textContent = msg;
}

// Game over function
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red' 
     // Disable input
     guessInputUI.disabled = true;
     // change border color
     guessInputUI.style.borderColor = color;
     // Set winning message
     setMessage(msg, color);

    //  Play again
    guessBtnUI.value = 'Play Again';
    guessBtnUI.className += 'play-again'
}