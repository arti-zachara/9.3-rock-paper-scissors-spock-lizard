"use strict";

var params = {
  roundsNumber: null,
  roundsPlayed: 0,
  gameActive: true
};

// providing game's output
var output = document.getElementById("output");
function displayText(text) {
  output.innerHTML = text + "<br>";
}
// providing game's result
var computerWins = 0,
  playerWins = 0,
  result = document.getElementById("result");
var displayResult = function(playerWins, computerWins) {
  result.innerHTML =
    "<strong>" +
    playerWins +
    "</strong> - <strong>" +
    computerWins +
    "</strong>";
};
displayResult(playerWins, computerWins);

// when game is no longer active
function inactiveGameDisplay() {
  displayText("Game over, please press the new game button!");
}

// Buttons allowing player to chose a move
var playerMoves = document.querySelectorAll(".player-move");

for (var i = 0; i < playerMoves.length; i++) {
  playerMoves[i].addEventListener("click", function() {
    var playerMoveChoice = this.getAttribute("data-move");
    if (params.gameActive) {
      // invoking playerMove function with a payer's choice parameter
      playerMove(playerMoveChoice);
    } else {
      inactiveGameDisplay();
    }
  });
}

// Computer move function randomizing the move
function computerMove() {
  var computerMoveRandom = Math.floor(Math.random() * 3) + 1;
  switch (computerMoveRandom) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

// determining who won the round
function determiningWinner(playerMoveChosen, computerMoveChoice) {
  if (playerMoveChosen === computerMoveChoice) {
    return "Noone";
  } else if (
    (playerMoveChosen === "paper" && computerMoveChoice === "rock") ||
    (playerMoveChosen === "rock" && computerMoveChoice === "scissors") ||
    (playerMoveChosen === "scissors" && computerMoveChoice === "paper")
  ) {
    playerWins++;
    return "You";
  } else {
    computerWins++;
    return "Computer";
  }
}

// game mechanics invoked after player's choice
function playerMove(playerMoveChosen) {
  var computerMoveChoice = computerMove();
  var gameResult = determiningWinner(playerMoveChosen, computerMoveChoice);
  displayResult(playerWins, computerWins);
  params.roundsPlayed++;
  var gameResultText =
    " Round " +
    params.roundsPlayed +
    ": <strong>" +
    gameResult +
    "</strong> won. You played <strong>" +
    playerMoveChosen +
    "</strong>, computer played <strong>" +
    computerMoveChoice +
    "</strong> ";
  if (playerWins === params.roundsNumber) {
    displayText("YOU WON THE ENTIRE GAME!!!" + gameResultText);
    params.gameActive = false;
  } else if (computerWins === params.roundsNumber) {
    displayText("COMPUTER WON THE ENTIRE GAME!!!" + gameResultText);
    params.gameActive = false;
  } else {
    displayText(gameResultText);
  }
}

// new game button starting a game consisting of a number of game provided by player
var newGame = document.getElementById("newGame"),
  rounds = document.getElementById("rounds");

newGame.addEventListener("click", function() {
  playerWins = 0;
  computerWins = 0;
  params.roundsPlayed = 0;
  displayResult(playerWins, computerWins);
  displayText(
    "Here you will see the results of each play against the computer."
  );
  var userInput = window.prompt("How many rounds do you want to play?");
  if (userInput === null || userInput === "") {
    rounds.innerHTML = "You didn't provide a value";
  } else if (isNaN(userInput)) {
    rounds.innerHTML = "The value you provided is not a number";
  } else if (parseInt(userInput) <= 0) {
    rounds.innerHTML =
      "The value you provided is not a possible number of rounds";
  } else {
    params.gameActive = true;
    params.roundsNumber = parseInt(userInput);
    rounds.innerHTML =
      "The game will end after <strong>" +
      params.roundsNumber +
      "</strong> wins";
  }
});
