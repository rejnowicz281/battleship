import "./assets/main.css";
import Game from "./components/Game";
import render from "./render.js";

let game = Game();

Object.keys(game).forEach((func) => {
    window[func] = game[func];
});

render(game);
