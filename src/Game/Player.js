import { boardRandomCoordinates, boardValidCords, randomDirection } from "../helpers/utils";
import Board from "./Board";
import Ship from "./Ship";

import { NUM_OF_SHIPS } from "../helpers/config";

export default function Player(name = "Player") {
    let board = Board();
    let ships = [];

    function fillBoard() {
        let shipLength = NUM_OF_SHIPS;

        while (shipLength >= 1) {
            if (shipLimit()) break;
            randomlyPlaceShip(shipLength);
            shipLength--;
        }
    }

    function randomlyPlaceShip(shipLength) {
        console.log(`Player '${name}' adding random ship of length ${shipLength}. `);
        let randomCords;
        let shipHead;
        let shipDirection;
        let placing;

        while (true) {
            randomCords = boardRandomCoordinates();
            shipHead = [randomCords.row, randomCords.column];
            shipDirection = randomDirection();

            placing = placeShip(shipLength, shipHead, shipDirection);
            if (placing == true || placing == "limit") return placing;
        }
    }

    function placeShip(...shipArgs) {
        if (!shipLimit()) {
            let ship = Ship(...shipArgs);

            if (!illegalShip(ship)) {
                instantiateShip(ship);
                return true;
            } else {
                console.log(`Illegal ship detected: (${ship.getCords().join("), (")})`);
                return false;
            }
        } else {
            console.log(`Player '${name}' has reached his ship limit.`);
            return "limit";
        }
    }

    function instantiateShip(ship) {
        ship.getCords().forEach((cord) => {
            board.placeShip(cord[0], cord[1]);
        });
        ships.push(ship);
        console.log(`Ship added: (${ship.getCords().join("), (")})`);
        board.show();
    }

    function shipLimit() {
        if (ships.length > NUM_OF_SHIPS - 1) {
            return true;
        } else {
            return false;
        }
    }

    function illegalShip(ship) {
        if (ship.getCords().some((cord) => !boardValidCords(cord[0], cord[1]) || board.shipAt(cord[0], cord[1]))) {
            return true;
        } else {
            return false;
        }
    }

    function allShipsDestroyed() {
        if (ships.length > 0) {
            for (let shipIndex in ships) {
                if (!ships[shipIndex].isDestroyed()) return false;
            }
            return true;
        } else {
            return false;
        }
    }

    function hit(row, column) {
        let shipAtCell = getShipAt(row, column);

        if (shipAtCell) {
            shipAtCell.hit();
        }

        board.hit(row, column);
    }

    function getShipAt(row, column) {
        for (let i = 0; i < ships.length; i++) {
            if (ships[i].hasCord(row, column)) {
                return ships[i];
            }
        }
        return null;
    }

    return {
        getBoard: () => board,
        getName: () => name,
        getShips: () => ships,
        shipLimit,
        allShipsDestroyed,
        placeShip,
        randomlyPlaceShip,
        fillBoard,
        hit,
    };
}
