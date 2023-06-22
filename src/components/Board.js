import { BOARD_SIZE } from "../config";
import { boardValidCords } from "../helpers";

export default function Board() {
    let arr = Array(BOARD_SIZE)
        .fill(" ")
        .map(() => Array(BOARD_SIZE).fill(" "));

    function show(showShips = true) {
        console.log(" ");
        console.log("     0   1   2   3   4   5   6   7   8   9");
        arr.forEach((row, i) => {
            let rowString = `${i}  |`;
            row.forEach((cell) => {
                let cellString = !showShips && cell == "S" ? " " : cell;
                rowString += ` ${cellString} |`;
            });
            console.log(rowString);
        });
        console.log(" ");
    }

    function getCell(row, column) {
        return arr[row][column];
    }

    function placeShip(row, column) {
        arr[row][column] = "S";
    }

    function shipAt(row, column) {
        return arr[row][column] == "S" || arr[row][column] == "H";
    }

    function hit(row, column) {
        if (boardValidCords(row, column) && !(getCell(row, column) == "H") && !(getCell(row, column) == "M")) {
            if (getCell(row, column) == "S") {
                arr[row][column] = "H";
            } else if (getCell(row, column) == " ") {
                arr[row][column] = "M";
            }
            return true;
        } else {
            return false;
        }
    }

    return {
        show,
        getCell,
        placeShip,
        shipAt,
        hit,
    };
}
