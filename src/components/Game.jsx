import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { boardRandomCoordinates } from "../helpers/utils";
import CreateGame from "./CreateGame";
import ShowGame from "./ShowGame";

export default function Game() {
    const [playerHuman, setPlayerHuman] = useState({
        name: "Human",
        ships: [],
        hits: [],
        misses: [],
    });

    const [playerAI, setPlayerAI] = useState({
        name: "AI",
        ships: [],
        hits: [],
        misses: [],
    });

    const [currentPlayer, setCurrentPlayer] = useState(null);

    function getRandomPlayer() {
        return Math.floor(Math.random() * 2) === 0 ? playerHuman : playerAI;
    }

    function getOpponent() {
        return currentPlayer === playerHuman ? playerAI : playerHuman;
    }

    function playRandomTurn() {
        while (true) {
            let randomCords = boardRandomCoordinates();

            let turn = playTurn(randomCords[0], randomCords[1]);
            if (turn) return turn;
        }
    }

    function playTurn(row, column) {
        if (getOpponent().getBoard().hit(row, column)) {
            let shipAtCell = getShipAt(row, column, getOpponent());
            if (shipAtCell) {
                shipAtCell.hit();
                // if (getOpponent().allShipsDestroyed())
                //     return console.log(`Player '${currentPlayer.getName()}' has won the game.`);
            }
            setCurrentPlayer(getOpponent());
            return true;
        } else {
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/battleship" element={<Navigate to="/battleship/createGame" />} />
                <Route path="/battleship/createGame" element={<CreateGame />} game={{ playerHuman, playerAI }} />
                <Route
                    path="/battleship/showGame"
                    element={<ShowGame game={{ playerHuman, playerAI }} getOpponent={getOpponent} />}
                />
            </Routes>
        </BrowserRouter>
    );
}
