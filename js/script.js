"use strict";

var params = {
  roundsNumber: null,
  roundsPlayed: 0,
  gameActive: true,
  computerWins: 0,
  playerWins: 0
};

// providing game's output
var output = document.getElementById("output");
function displayText(text) {
  output.innerHTML = text + "<br>";
}
// providing game's result
var result = document.getElementById("result");
var displayResult = function() {
  result.innerHTML =
    "<strong>" +
    params.playerWins +
    "</strong> - <strong>" +
    params.computerWins +
    "</strong>";
};
displayResult();

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
    params.playerWins++;
    return "You";
  } else {
    params.computerWins++;
    return "Computer";
  }
}

// game mechanics invoked after player's choice
function playerMove(playerMoveChosen) {
  var computerMoveChoice = computerMove();
  var gameResult = determiningWinner(playerMoveChosen, computerMoveChoice);
  displayResult();
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
  if (params.playerWins === params.roundsNumber) {
    var modalContent = "YOU WON THE ENTIRE GAME!!!" + gameResultText;
    var modalToBeDisplayed = "#modal-game-over";
    addModalContent(modalToBeDisplayed, modalContent);
    showModal(modalToBeDisplayed);
    // displayText("YOU WON THE ENTIRE GAME!!!" + gameResultText);
    params.gameActive = false;
  } else if (params.computerWins === params.roundsNumber) {
    var modalContent = "COMPUTER WON THE ENTIRE GAME!!!" + gameResultText;
    var modalToBeDisplayed = "#modal-game-over";
    addModalContent(modalToBeDisplayed, modalContent);
    showModal(modalToBeDisplayed);
    // displayText("COMPUTER WON THE ENTIRE GAME!!!" + gameResultText);
    params.gameActive = false;
  } else {
    displayText(gameResultText);
  }
}

// new game button starting a game consisting of a number of game provided by player
var newGame = document.getElementById("newGame"),
  rounds = document.getElementById("rounds");

newGame.addEventListener("click", function() {
  params.playerWins = 0;
  params.computerWins = 0;
  params.roundsPlayed = 0;
  displayResult();
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

// remove "show" class from all modals
function hideAllModals() {
  for (var i = 0; i < modals.length; i++) {
    modals[i].classList.remove("show");
  }
}

// links opening modals
// var modalLinks = document.querySelectorAll(".show-modal");

// for (var i = 0; i < modalLinks.length; i++) {
//   modalLinks[i].addEventListener("click", function() {
//     var modalLinkId = this.getAttributeNode("href").value;
//     showModal(event, modalLinkId);
//   });
// }
// function adding modal content
var addModalContent = function(modalId, modalContentToBeAdded) {
  var modalChanged = document.querySelector(modalId);
  modalChanged.querySelector(".content").innerHTML = modalContentToBeAdded;
};

// function opening modal
var showModal = function(modalToBeShown) {
  hideAllModals();
  document.querySelector(modalToBeShown).classList.add("show");
  document.querySelector("#modal-overlay").classList.add("show");
};

// closing modals removing overlay display
var hideModal = function(event) {
  event.preventDefault();
  document.querySelector("#modal-overlay").classList.remove("show");
};

var closeButtons = document.querySelectorAll(".modal .close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
}

// closing by clicking overlay
document.querySelector("#modal-overlay").addEventListener("click", hideModal);

// stopping propagation in overlay
var modals = document.querySelectorAll(".modal");

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function(event) {
    event.stopPropagation();
  });
}
