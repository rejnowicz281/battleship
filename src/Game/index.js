import { boardRandomCoordinates } from "../helpers/utils";
import Player from "./Player.js";

export default function Game() {
    const playerHuman = Player("Human");
    const playerAI = Player("Computer");

    let currentPlayer = getRandomPlayer();

    function getRandomPlayer() {
        return [playerHuman, playerAI][Math.round(Math.random())];
    }

    function getOtherPlayer() {
        if (currentPlayer == playerHuman) {
            return playerAI;
        } else {
            return playerHuman;
        }
    }

    function fillBoards() {
        playerHuman.fillBoard();
        playerAI.fillBoard();

        console.log("---- RANDOM SHIPS PLACED ----");
    }

    function getCurrentInfo() {
        console.log(`Player '${currentPlayer.getName()}' is playing. His board: `);
        currentPlayer.getBoard().show();
        console.log(`Opponent's board:`);
        getOtherPlayer().getBoard().show();
    }

    function playRandomTurn() {
        let turn;
        let randomCords;

        while (true) {
            randomCords = boardRandomCoordinates();

            turn = playTurn(randomCords.row, randomCords.column);
            if (turn == true || turn == "win") {
                return turn;
            }
        }
    }

    function playTurn(row, column) {
        console.log(`Player '${currentPlayer.getName()}' has shot at (${row},${column}).`);
        if (getOtherPlayer().getBoard().legalHit(row, column)) {
            console.log(getOtherPlayer().getBoard().getCell(row, column));
            getOtherPlayer().hit(row, column);
            if (getOtherPlayer().allShipsDestroyed()) {
                console.log(`Player '${currentPlayer.getName()}' has won!`);
                return "win";
            }
            currentPlayer = getOtherPlayer();
            return true;
        } else {
            console.log("Illegal hit. Try again.");
            return false;
        }
    }

    function getPlayer(name) {
        if (playerHuman.getName() == name) {
            return playerHuman;
        } else if (playerAI.getName() == name) {
            return playerAI;
        }
        return null;
    }

    return {
        getCurrentPlayer: () => currentPlayer,
        getOtherPlayer,
        getPlayer,
        fillBoards,
        playRandomTurn,
        playTurn,
        getCurrentInfo,
    };
}
