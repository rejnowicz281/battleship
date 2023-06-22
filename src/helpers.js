import { BOARD_SIZE } from "./config.js";

export function boardValidCords(row, column) {
    if (!(isNaN(row) || isNaN(column) || row < 0 || row >= BOARD_SIZE || column < 0 || column >= BOARD_SIZE)) {
        return true;
    } else {
        console.log(`Invalid cords (${row}, ${column}) detected`);
        return false;
    }
}

export function boardRandomCoordinates() {
    return [Math.floor(Math.random() * BOARD_SIZE), Math.floor(Math.random() * BOARD_SIZE)];
}
