import { BOARD_SIZE } from "./config";

export default function render(game) {
    let humanBoard = document.getElementById("human-board");
    let computerBoard = document.getElementById("computer-board");

    game.placeRandomShips(); // Place ships randomly - Will implement manual ship placing

    function renderBoard(board, player) {
        board.innerHTML = "";
        let cell;

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let column = 0; column < BOARD_SIZE; column++) {
                cell = document.createElement("div");
                cell.classList.add("board-cell");
                cell.dataset.row = row;
                cell.dataset.column = column;
                if (
                    game.getCurrentPlayer().getName() == "Human" &&
                    !game.getOtherPlayer().allShipsDestroyed() &&
                    board == computerBoard
                ) {
                    cell.onclick = () => {
                        game.playTurn(row, column);
                        update(game);
                    };
                }
                renderCell(cell, player);
                board.appendChild(cell);
            }
        }
    }

    function renderCell(domCell, player) {
        let gameCell = player.board.getCell(parseInt(domCell.dataset.row), parseInt(domCell.dataset.column));
        if (gameCell == "S" && player.getName() == "Human") {
            domCell.classList.add("ship");
        } else if (gameCell == "H") {
            domCell.classList.remove("ship");
            domCell.classList.add("hit");
        } else if (gameCell == "M") {
            domCell.classList.add("miss");
        }
    }

    function computerAutoPlay() {
        if (game.getCurrentPlayer().getName() == "Computer") {
            game.playRandomTurn(); // Automatically play computer turn
        }
    }

    function update() {
        computerAutoPlay();
        renderBoard(humanBoard, game.getPlayer("Human"));
        renderBoard(computerBoard, game.getPlayer("Computer"));
    }

    update();
}
