import Player from "./Player.js";

export default function Game() {
    let playerHuman = Player("Human");
    let playerComputer = Player("Computer");

    let currentPlayer = getRandomPlayer();

    function getRandomPlayer() {
        if (Math.random() > 0.5) {
            return playerHuman;
        } else {
            return playerComputer;
        }
    }

    function otherPlayer() {
        if (currentPlayer == playerHuman) {
            return playerComputer;
        } else {
            return playerHuman;
        }
    }

    function start() {
        playerHuman.chooseStartShips();
        playerComputer.chooseStartShips(true);

        console.log("---- GAME STARTED ----");
        playTurn();
    }

    function playTurn() {
        console.log(`Player '${currentPlayer.getName()}' is playing. His board: `);
        currentPlayer.board.show();
        while (true) {
            console.log(`Opponent's board:`);
            otherPlayer().board.show(false);
            let input = prompt(`Current Player: ${currentPlayer.getName()}.\nType in coordinates (eg. 0,0) to shoot.`);

            let cordsPattern = /^\d+,\d+$/;

            if (cordsPattern.test(input)) {
                let row = parseInt(input.split(",")[0]);
                let column = parseInt(input.split(",")[1]);
                if (otherPlayer().board.hit(row, column)) {
                    console.log(
                        `Player '${currentPlayer.getName()}' has shot at (${row},${column}). ${otherPlayer().board.getCell(
                            row,
                            column
                        )}`
                    );
                    let shipAtCell = getShipAt(row, column, otherPlayer());
                    if (shipAtCell) {
                        shipAtCell.hit();
                    }
                    otherPlayer().board.show(false);
                    if (otherPlayer().allShipsDestroyed()) {
                        return console.log(`Player '${currentPlayer.getName()}' has won the game.`);
                    } else {
                        currentPlayer = otherPlayer();
                        return playTurn();
                    }
                } else {
                    console.log("Invalid hit. Try again.");
                }
            } else {
                console.log("Invalid input. Try again.");
            }
        }
    }

    function getShipAt(row, column, player) {
        for (let i = 0; i < player.getShips().length; i++) {
            if (player.getShips()[i].hasCord(row, column)) {
                return player.getShips()[i];
            }
        }
        return null;
    }

    return {
        start,
    };
}
