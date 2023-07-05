import { beforeEach, describe, expect, it } from "vitest";
import Board from "../Game/Board.js";
import { boardValidCords } from "../helpers/utils";

describe("Board", () => {
    let board;

    beforeEach(() => {
        board = Board();
    });

    it("Can get hit", () => {
        board.placeShip(0, 1);
        board.hit(0, 0);
        board.hit(0, 1);
        expect(board.getCell(0, 0)).toBe("M");
        expect(board.getCell(0, 1)).toBe("H");
    });

    it("Gets correct cell", () => {
        board.placeShip(0, 1);
        expect(board.getCell(0, 0) == " ").toBe(true);
        expect(board.getCell(0, 1) == "S").toBe(true);
    });

    it("Validates cords", () => {
        expect(boardValidCords(-4, 504)).toBe(false);
        expect(boardValidCords(-4, 0)).toBe(false);
        expect(boardValidCords(0, 0)).toBe(true);
        expect(boardValidCords("4'fdf;dsd'9", "asmkas")).toBe(false);
    });
});
