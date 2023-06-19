import "./assets/main.css";
import Game from "./components/Game";

let game = Game();

game.placeShips();

Object.keys(game).forEach((func) => {
    window[func] = game[func];
});
