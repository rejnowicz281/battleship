import Board from "./Board";

export default function Player() {
    let board = Board();
    let ships = [];

    function addShip(ship) {
        ships.push(ship);
    }

    return {
        board,
        addShip,
        getShips: () => ships,
    };
}
