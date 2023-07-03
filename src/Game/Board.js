import { BOARD_SIZE } from "../helpers/config";
import { boardValidCords } from "../helpers/utils";

export default function Board() {
    let grid = Array(BOARD_SIZE)
        .fill(" ")
        .map(() => Array(BOARD_SIZE).fill(" "));

    function show(showShips = true) {
        console.log(" ");
        console.log("     0   1   2   3   4   5   6   7   8   9");
        grid.forEach((row, i) => {
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
        return grid[row][column];
    }

    function placeShip(row, column) {
        grid[row][column] = "S";
    }

    function shipAt(row, column) {
        return grid[row][column] == "S" || grid[row][column] == "H";
    }

    function hit(row, column) {
        if (getCell(row, column) == "S") {
            grid[row][column] = "H";
        } else if (getCell(row, column) == " ") {
            grid[row][column] = "M";
        }
    }

    function legalHit(row, column) {
        return boardValidCords(row, column) && !(getCell(row, column) == "H") && !(getCell(row, column) == "M");
    }

    return {
        show,
        getCell,
        placeShip,
        shipAt,
        hit,
        legalHit,
        getGrid: () => grid,
    };
}
