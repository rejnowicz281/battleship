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

    function placeShips() {
        playerHuman.chooseStartShips(true);
        playerComputer.chooseStartShips(true);

        console.log("---- SHIPS PLACED ----");
    }

    function getCurrentInfo() {
        console.log(`Player '${currentPlayer.getName()}' is playing. His board: `);
        currentPlayer.board.show();
        console.log(`Opponent's board:`);
        otherPlayer().board.show(true);
    }

    function playTurn(row, column) {
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
                if (otherPlayer().allShipsDestroyed())
                    return console.log(`Player '${currentPlayer.getName()}' has won the game.`);
            }
            currentPlayer = otherPlayer();
        } else {
            console.log("Illegal hit. Try again.");
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
        placeShips,
        playTurn,
        getCurrentInfo,
    };
}
