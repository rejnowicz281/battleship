import { BOARD_SIZE, NUM_OF_SHIPS } from "./config";

export default function render(game) {
    const humanBoard = document.getElementById("human-board");
    const computerBoard = document.getElementById("computer-board");
    const computerBoardContainer = document.querySelector(".computer-board-container");
    const boardPlayerName = document.querySelector(".board-player-name");
    const feedback = document.querySelector(".feedback");
    const shipsLeft = document.getElementById("ships-left");

    function renderBoard(board, player) {
        board.innerHTML = "";
        let cell;

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let column = 0; column < BOARD_SIZE; column++) {
                cell = document.createElement("div");
                cell.classList.add("board-cell");
                if (
                    game.getCurrentPlayer().getName() == "Human" &&
                    !game.getPlayer("Computer").allShipsDestroyed() &&
                    !game.getPlayer("Human").allShipsDestroyed() &&
                    board == computerBoard
                ) {
                    cell.onclick = () => {
                        game.playTurn(row, column);
                        update(game);
                    };
                } else if (board == humanBoard && !game.getPlayer("Human").shipLimit()) {
                    cell.onclick = () => {
                        let shipsLeft = NUM_OF_SHIPS - game.getPlayer("Human").getShips().length;
                        game.getPlayer("Human").placeShip(shipsLeft, [row, column]);
                        update(game);
                    };
                }
                let gameCell = player.getBoard().getCell(row, column);
                if (gameCell == "S" && player.getName() == "Human") {
                    cell.classList.add("ship");
                } else if (gameCell == "H") {
                    cell.classList.remove("ship");
                    cell.classList.add("hit");
                } else if (gameCell == "M") {
                    cell.classList.add("miss");
                }
                board.appendChild(cell);
            }
        }
    }

    function computerAutoPlay() {
        if (game.getCurrentPlayer().getName() == "Computer") {
            game.playRandomTurn(); // Automatically play computer turn
        }
    }

    function renderWin() {
        if (game.getPlayer("Human").allShipsDestroyed()) {
            feedback.innerHTML = "<h1>Computer wins!</h1>!";
        } else if (game.getPlayer("Computer").allShipsDestroyed()) {
            feedback.innerHTML = "<h1>Human wins!</h1>";
        } else {
            feedback.textContent = "";
        }
    }

    function update() {
        if (game.getPlayer("Human").shipLimit()) {
            if (NUM_OF_SHIPS - game.getPlayer("Computer").getShips().length == NUM_OF_SHIPS) {
                game.getPlayer("Computer").randomlyPlaceShips();
            }
            computerAutoPlay();
            renderBoard(computerBoard, game.getPlayer("Computer"));
            boardPlayerName.classList.remove("d-none");
            computerBoardContainer.classList.remove("d-none");
            renderWin();
        } else {
            shipsLeft.textContent = NUM_OF_SHIPS - game.getPlayer("Human").getShips().length;
        }
        renderBoard(humanBoard, game.getPlayer("Human"));
    }

    update();
}
