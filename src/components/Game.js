import Player from "./Player.js";

export default function Game() {
    const players = [Player("Human"), Player("Computer")];
    let currentPlayer = getRandomPlayer();

    function getRandomPlayer() {
        return players[Math.round(Math.random())];
    }

    function otherPlayer() {
        if (currentPlayer == players[0]) {
            return players[1];
        } else {
            return players[0];
        }
    }

    function placeShips() {
        players[0].chooseStartShips(true);
        players[1].chooseStartShips(true);

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

    function getPlayer(name) {
        for (let player in players) {
            if (players[player].getName() == name) {
                return players[player];
            }
        }
        return null;
    }

    return {
        getPlayer,
        placeShips,
        playTurn,
        getCurrentInfo,
    };
}
