"use strict";


document.addEventListener("DOMContentLoaded", () => {
  
  const guessInput = document.getElementById("guess-input");
  const submitBtn = document.getElementById("submit-btn");
  const restartBtn = document.getElementById("restart-btn");

  const guessMessage = document.getElementById("guess-message");
  const currentGuess = document.getElementById("current-guess");
  const computerGuess = document.getElementById("computer-guess");
  const guessHistory = document.getElementById("guess-history");

  let computerNumber = generateRandomNumber(1, 100); // Computer's random number
  let attempts = 3; // Total attempts allowed
  let history = []; // User's guess history

  console.log("The computer's number is:", computerNumber); // For debugging

  // Generate a random number between min and max
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Handle the guess submission
  function handleGuess() {
    const userGuess = parseInt(guessInput.value, 10);

    // Validate user input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      guessMessage.textContent = "Please enter a number between 1 and 100.";
      return;
    }

    // Update current guess and history
    currentGuess.textContent = userGuess;
    history.push(userGuess);
    guessHistory.textContent = history.join(", ");

    // Check the guess
    if (userGuess === computerNumber) {
      guessMessage.textContent = "🎉 You guessed it! Well done!";
      endGame(true);
    } else {
      attempts -= 1;
      if (attempts === 0) {
        guessMessage.textContent = "💥 Game over! No more attempts.";
        computerGuess.textContent = computerNumber; // Reveal computer's number
        endGame(false);
      } else {
        guessMessage.textContent =
          userGuess < computerNumber
            ? "📉 Too low! Try again."
            : "📈 Too high! Try again.";
      }
    }

    // Clear input for the next attempt
    guessInput.value = "";
  }

  // End the game
  function endGame(isWin) {
    submitBtn.disabled = true;
    restartBtn.disabled = false;
    guessInput.disabled = true;
    if (!isWin) {
      computerGuess.textContent = computerNumber; // Reveal computer's number if the user lost
    }
  }

  // Restart the game
  function restartGame() {
    computerNumber = generateRandomNumber(1, 100);
    attempts = 3;
    history = [];
    guessInput.value = "";

    // Reset UI
    guessMessage.textContent = "Try to guess the computer's number within 3 tries!";
    currentGuess.textContent = "";
    computerGuess.textContent = "";
    guessHistory.textContent = "";

    submitBtn.disabled = false;
    restartBtn.disabled = true;
    guessInput.disabled = false;

    console.log("New computer number is:", computerNumber); // For debugging
  }

  // Event listeners
  submitBtn.addEventListener("click", handleGuess);
  restartBtn.addEventListener("click", restartGame);
});
