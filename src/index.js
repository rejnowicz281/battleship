import "./assets/main.css";
import Game from "./components/Game";

let game = Game();

game.placeShips();

window.placeShips = game.placeShips;
window.playTurn = game.playTurn;
window.getCurrentInfo = game.getCurrentInfo;
