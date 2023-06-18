export default function Board() {
    const SIZE = 10;

    let arr = Array(SIZE)
        .fill(" ")
        .map(() => Array(SIZE).fill(" "));

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
        return [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
    }

    function validCords(row, column) {
        return !(isNaN(row) || isNaN(column) || row < 0 || row >= SIZE || column < 0 || column >= SIZE);
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
        getSize: () => SIZE,
    };
}
