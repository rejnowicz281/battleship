import "./assets/main.scss";
import Game from "./components/Game";
import render from "./render.js";

let game = Game();

game.randomlyPlaceShips();

Object.keys(game).forEach((func) => {
    window[func] = game[func];
});

render(game);
