import { BOARD_SIZE } from "../config";

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

    function getRandomCoordinates() {
        return [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
    }

    function validCords(row, column) {
        return !(isNaN(row) || isNaN(column) || row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE);
    }

    function isCellAt(row, column, value) {
        return arr[row][column] == value;
    }

    function getCell(row, column) {
        return arr[row][column];
    }

    function setCell(row, column, value) {
        if (value == "H" || value == "M" || value == "S") {
            arr[row][column] = value;
        }
    }

    function hit(row, column) {
        if (validCords(row, column) && !isCellAt(row, column, "H") && !isCellAt(row, column, "M")) {
            if (isCellAt(row, column, "S")) {
                setCell(row, column, "H");
            } else if (isCellAt(row, column, " ")) {
                setCell(row, column, "M");
            }
            return true;
        } else {
            return false;
        }
    }

    return {
        show,
        isCellAt,
        getCell,
        setCell,
        hit,
        validCords,
        getRandomCoordinates,
    };
}
