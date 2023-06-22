import { boardRandomCoordinates, boardValidCords } from "../helpers.js";
import Board from "./Board";
import Ship from "./Ship";

import { NUM_OF_SHIPS } from "../config";

export default function Player(name = "Player") {
    let board = Board();
    let ships = [];

    function randomlyPlaceShips() {
        let shipLength = NUM_OF_SHIPS;

        while (shipLength >= 1) {
            if (shipLimit()) break;
            randomlyPlaceShip(shipLength);
            shipLength--;
        }
    }

    function randomlyPlaceShip(shipLength) {
        console.log(`Player '${name}' adding random ship of length ${shipLength}. `);
        while (true) {
            let shipHead = boardRandomCoordinates();
            let shipDirection = ["left", "right", "up", "down"][Math.floor(Math.random() * 4)];

            let place = placeShip(shipLength, shipHead, shipDirection);
            if (place) return place;
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
            board.placeShip(cord[0], cord[1]);
        });
        ships.push(ship);
        console.log(`Ship added: (${ship.getCords().join("), (")})`);
        board.show();
    }

    function shipLimit() {
        if (ships.length > NUM_OF_SHIPS - 1) {
            console.log(`Player '${name}' has reached his ship limit.`);
            return true;
        } else {
            return false;
        }
    }

    function illegalShip(ship) {
        if (ship.getCords().some((cord) => !boardValidCords(cord[0], cord[1]) || board.shipAt(cord[0], cord[1]))) {
            console.log(`Illegal ship detected: (${ship.getCords().join("), (")})`);
            return true;
        } else {
            return false;
        }
    }

    function allShipsDestroyed() {
        for (let shipIndex in ships) {
            if (!ships[shipIndex].isDestroyed()) return false;
        }
        console.log(`All of '${name}' ships destroyed.`);
        return true;
    }

    return {
        getBoard: () => board,
        getName: () => name,
        shipLimit,
        allShipsDestroyed,
        placeShip,
        randomlyPlaceShips,
        randomlyPlaceShips,
        getShips: () => ships,
    };
}
