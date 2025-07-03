let boxes = document.querySelectorAll(".boxes");
let turnX = true;
let turn1 = document.querySelector(".turn1");
let turn2 = document.querySelector(".turn2");
let msg = document.querySelector(".msg");
let span = document.querySelector("#result");
let reset = document.getElementById("reset");
let ng = document.getElementById("ng");

let clickSound = new Audio("Click1.mp3");
let winnerSound = new Audio("winner.mp3");

let WinnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function resetGame() {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover");
        box.classList.remove("b-s", "winner");
    });
    msg.classList.add("hide");
    turnX = true;
    turn1.classList.add("b-s");
    turn2.classList.remove("b-s");
}

reset.addEventListener('click', resetGame);
ng.addEventListener('click', resetGame);

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (!msg.classList.contains("hide") || box.innerText !== "") return;

        clickSound.play();
        box.disabled = true;

        if (turnX) {
            box.innerText = "X";
            box.style.color = "rgb(174,51,96)";
            turn2.classList.add("b-s");
            turn1.classList.remove("b-s");
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "rgb(17,52,182)";
            turn1.classList.add("b-s");
            turn2.classList.remove("b-s");
            turnX = true;
        }

        checkWinner();
    });
});

function checkWinner() {
    let winnerFound = false;

    for (let condition of WinnerCondition) {
        let box1 = boxes[condition[0]].innerText;
        let box2 = boxes[condition[1]].innerText;
        let box3 = boxes[condition[2]].innerText;

        if (box1 !== "" && box1 === box2 && box2 === box3) {
            showResult(box1);
            winnerSound.play();
            boxes.forEach(box => box.classList.add("b-s"));
            boxes[condition[0]].classList.add("winner");
            boxes[condition[1]].classList.add("winner");
            boxes[condition[2]].classList.add("winner");
            winnerFound = true;
            return;
        }
    }

    if (!winnerFound) {
        let allFilled = [...boxes].every(box => box.innerText !== "");
        if (allFilled) {
            showResult("Draw");
        }
    }
}

function showResult(result) {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.remove("hover");
    });
    msg.classList.remove("hide");

    if (result === "X" || result === "O") {
        span.innerText = `Winner: ${result}`;
        span.style.color = result === "X" ? "rgb(174,51,96)" : "rgb(17,52,182)";
    } else {
        span.innerText = "Draw";
        span.style.color = "lightgray";
    }

    // Optional: auto reset after 3 seconds
    setTimeout(() => {
        resetGame();
    }, 3000);
}
