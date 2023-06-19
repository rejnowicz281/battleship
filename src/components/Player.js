import Board from "./Board";
import Ship from "./Ship";

export default function Player(name = "Player") {
    let board = Board();
    let ships = [];

    function placeFiveRandomShips() {
        let shipLength = 5;

        while (shipLength >= 1) {
            console.log(`Player '${name}' adding random ship of length ${shipLength}. Player's board:`);
            board.show();
            placeRandomShip(shipLength);
            shipLength--;
        }
    }

    function placeRandomShip(shipLength) {
        let shipHead = board.getRandomCoordinates();
        let shipDirection = ["left", "right", "up", "down"][Math.floor(Math.random() * 4)];

        if (!placeShip(shipLength, shipHead, shipDirection)) {
            placeRandomShip(shipLength);
        }
    }

    function placeShip(...shipArgs) {
        let ship = Ship(...shipArgs);

        if (!illegalShip(ship)) {
            ship.getCords().forEach((cord) => {
                board.setCell(cord[0], cord[1], "S");
            });
            ships.push(ship);
            console.log(`Ship added: (${ship.getCords().join("), (")})`);
            board.show();
            return true;
        } else {
            console.log(`Illegal ship detected: (${ship.getCords().join("), (")})`);
            return false;
        }
    }

    function illegalShip(ship) {
        return ship
            .getCords()
            .some((cord) => !board.validCords(cord[0], cord[1]) || board.isCellAt(cord[0], cord[1], "S"));
    }

    function allShipsDestroyed() {
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isDestroyed()) return false;
        }
        return true;
    }

    return {
        board,
        getName: () => name,
        allShipsDestroyed,
        placeShip,
        placeRandomShip,
        placeFiveRandomShips,
        getShips: () => ships,
    };
}
