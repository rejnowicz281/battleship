import Board from "./Board";
import Ship from "./Ship";

import { NUM_OF_SHIPS } from "../config";

export default function Player(name = "Player") {
    let board = Board();
    let ships = [];

    function placeRandomShips() {
        if (!shipLimit()) {
            let shipLength = NUM_OF_SHIPS;

            while (shipLength >= 1) {
                console.log(`Player '${name}' adding random ship of length ${shipLength}. Player's board:`);
                board.show();
                placeRandomShip(shipLength);
                shipLength--;
            }
        }
    }

    function placeRandomShip(shipLength) {
        if (!shipLimit()) {
            let shipHead = board.getRandomCoordinates();
            let shipDirection = ["left", "right", "up", "down"][Math.floor(Math.random() * 4)];

            let ship = Ship(shipLength, shipHead, shipDirection);

            if (!illegalShip(ship)) {
                instantiateShip(ship);
                return true;
            } else {
                placeRandomShip(shipLength);
            }
        } else {
            return false;
        }
    }

    function placeShip(...shipArgs) {
        let ship = Ship(...shipArgs);

        if (!illegalShip(ship) && !shipLimit()) {
            instantiateShip(ship);
            return true;
        } else {
            return false;
        }
    }

    function instantiateShip(ship) {
        ship.getCords().forEach((cord) => {
            board.setCell(cord[0], cord[1], "S");
        });
        ships.push(ship);
        console.log(`Ship added: (${ship.getCords().join("), (")})`);
    }

    function shipLimit() {
        if (ships.length > NUM_OF_SHIPS - 1) {
            console.log(`Player '${name}' can't add any more ships!`);
            return true;
        } else {
            return false;
        }
    }

    function illegalShip(ship) {
        if (
            ship.getCords().some((cord) => !board.validCords(cord[0], cord[1]) || board.isCellAt(cord[0], cord[1], "S"))
        ) {
            console.log(`Illegal ship detected: (${ship.getCords().join("), (")})`);
            return true;
        }
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
        shipLimit,
        allShipsDestroyed,
        placeShip,
        placeRandomShip,
        placeRandomShips,
        getShips: () => ships,
    };
}
