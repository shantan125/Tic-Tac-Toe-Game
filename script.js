// Selecting elements from the HTML
let boxes = document.querySelectorAll(".box");
let msgcont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let reset = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-btn");

// Initializing game variables
let turno = true;  // Represents the current player's turn (true for player O, false for player X)
let count = 0;     // Counts the number of moves made

// Creating a win pattern to store winning combinations
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Function to disable the box
const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable the box
const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = " ";  // Resetting the box text content
    }
};

// Function to reset the game
const resetGame = () => {
    turno = true;
    count = 0;
    enableBox();  // Re-enable boxes for a new game
    msgcont.classList.add("hide");  // Hide the message container
};

// Function for game draw 
const gameDraw = () => {
    msg.innerText = "Game was a Draw";
    msgcont.classList.remove("hide");  // Display the message container
    disableBox();  // Disable boxes to prevent further moves
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPattern) {
        let posOne = boxes[pattern[0]].innerText;
        let posTwo = boxes[pattern[1]].innerText;
        let posThree = boxes[pattern[2]].innerText;
        if (posOne !== "" && posTwo !== "" && posThree !== "") {
            if (posOne === posTwo && posTwo === posThree) {
                showWinner(posOne);
            }
        }
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");  // Display the message container
    disableBox();  // Disable boxes to prevent further moves
};

// Game play process between playerX and playerO
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }

        box.disabled = true;
        turno = !turno; // Toggle the turn after each click
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        } else if (isWinner) {
            showWinner(turno ? "O" : "X");
        }
    });
});
// For New Game button
newgame.addEventListener("click", resetGame);

// For Reset button
reset.addEventListener("click", () => {
    resetGame();
    enableBox();  // Additional step to enable boxes for a reset
});
