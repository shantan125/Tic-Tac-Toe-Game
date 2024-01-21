let boxes = document.querySelectorAll(".box");
let msgcont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let reset = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-btn");

let turno = true;
let count = 0;

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

const disableBox = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBox = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = " ";
    }
};

const resetGame = () => {
    turno = true;
    count = 0;
    enableBox();
    msgcont.classList.add("hide");
    // Reset message content to its initial value
    msg.innerText = "Winner";
};

const gameDraw = () => {
    msg.innerText = "Game was a Draw";
    msgcont.classList.remove("hide");
    disableBox();
};

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

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");
    disableBox();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }

        box.disabled = true;
        turno = !turno;
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
    enableBox();
});
