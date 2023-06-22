import { BOARD_SIZE } from "./config";

export default function render(game) {
    const humanBoard = document.getElementById("human-board");
    const computerBoard = document.getElementById("computer-board");
    const feedback = document.querySelector(".feedback");

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
            feedback.textContent = "Computer wins!";
        } else if (game.getPlayer("Computer").allShipsDestroyed()) {
            feedback.textContent = "Human wins!";
        }
    }

    function update() {
        computerAutoPlay();
        renderBoard(humanBoard, game.getPlayer("Human"));
        renderBoard(computerBoard, game.getPlayer("Computer"));
        renderWin();
    }

    update();
}
