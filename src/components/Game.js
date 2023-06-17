import Player from "./Player.js";

export default function Game() {
    let playerHuman = Player();
    let playerComputer = Player();

    return {
        playerHuman,
        playerComputer,
    };
}
