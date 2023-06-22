import { boardRandomCoordinates } from "../helpers.js";
import Player from "./Player.js";

export default function Game() {
    const players = [Player("Human"), Player("Computer")];
    let currentPlayer = getRandomPlayer();

    function getRandomPlayer() {
        return players[Math.round(Math.random())];
    }

    function getOtherPlayer() {
        if (currentPlayer == players[0]) {
            return players[1];
        } else {
            return players[0];
        }
    }

    function randomlyPlaceShips() {
        players[0].randomlyPlaceShips();
        players[1].randomlyPlaceShips();

        console.log("---- RANDOM SHIPS PLACED ----");
    }

    function getCurrentInfo() {
        console.log(`Player '${currentPlayer.getName()}' is playing. His board: `);
        currentPlayer.getBoard().show();
        console.log(`Opponent's board:`);
        getOtherPlayer().getBoard().show();
    }

    function playRandomTurn() {
        while (true) {
            let randomCords = boardRandomCoordinates();

            let turn = playTurn(randomCords[0], randomCords[1]);
            if (turn) return turn;
        }
    }

    function playTurn(row, column) {
        console.log(`Player '${currentPlayer.getName()}' has shot at (${row},${column}).`);
        if (getOtherPlayer().getBoard().hit(row, column)) {
            console.log(getOtherPlayer().getBoard().getCell(row, column));
            let shipAtCell = getShipAt(row, column, getOtherPlayer());
            if (shipAtCell) {
                shipAtCell.hit();
                if (getOtherPlayer().allShipsDestroyed())
                    return console.log(`Player '${currentPlayer.getName()}' has won the game.`);
            }
            currentPlayer = getOtherPlayer();
            return true;
        } else {
            console.log("Illegal hit. Try again.");
            return false;
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
        getCurrentPlayer: () => currentPlayer,
        getOtherPlayer,
        getPlayer,
        randomlyPlaceShips,
        playRandomTurn,
        playTurn,
        getCurrentInfo,
    };
}
