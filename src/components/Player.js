import Board from "./Board";
import Ship from "./Ship";

export default function Player(name = "Player") {
    let board = Board();
    let ships = [];

    function chooseStartShips(random = false) {
        let shipLength = 5;

        while (shipLength >= 1) {
            console.log(`Player '${name}' choosing ship of length ${shipLength}. Player's board:`);
            board.show();
            if (random) {
                addRandomShip(shipLength);
            } else {
                chooseShip(shipLength);
            }
            shipLength--;
        }
    }

    function chooseShip(shipLength) {
        let ship = Ship(shipLength, [0, 0]);

        while (true) {
            let input = prompt(
                `Current direction: ${ship.getDirection()}. \nType 'R' if you want to rotate your ship.\nType in coordinates (eg. 0,0) to place a ship.`
            );

            let cordsPattern = /^\d+,\d+$/;

            if (input == "R" || input == "r") {
                ship.rotate();
            } else if (cordsPattern.test(input)) {
                let row = parseInt(input.split(",")[0]);
                let column = parseInt(input.split(",")[1]);
                ship.moveTo(row, column);
                if (addShip(ship)) break;
            } else {
                console.log("Invalid input. Try again.");
            }
        }
    }

    function addRandomShip(shipLength) {
        let shipHead = board.getRandomCoordinates();
        let randomShip = Ship(shipLength, shipHead);
        if (Math.random() > 0.5) randomShip.rotate();
        if (!addShip(randomShip)) {
            addRandomShip(shipLength);
        }
    }

    function addShip(ship) {
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
        return ship.getCords().some((cord) => !board.validCords(cord[0], cord[1]) || board.isShipAt(cord[0], cord[1]));
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
        addShip,
        chooseStartShips,
        getShips: () => ships,
    };
}
