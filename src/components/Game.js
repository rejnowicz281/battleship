import Player from "./Player.js";

export default function Game() {
    let playerHuman = Player();
    let playerComputer = Player();

    function start() {
        playerHuman.chooseStartShips();
        playerComputer.chooseStartShips(true);
    }

    return {
        start,
    };
}
