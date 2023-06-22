import { describe, expect, it } from "vitest";
import Board from "../components/Board.js";
import { boardValidCords } from "../helpers.js";

describe("Board", () => {
    const board = Board();

    it("Can hit and miss", () => {
        board.hit(0, 1);
        expect(board.getCell(0, 1)).toBe("M");
    });

    it("Checks cell's value", () => {
        board.placeShip(0, 1);
        expect(board.getCell(0, 0) == " ").toBe(true);
        expect(board.getCell(0, 1) == "S").toBe(true);
    });

    it("Hits cell correctly", () => {
        board.placeShip(0, 1);
        board.hit(0, 1);
        expect(board.getCell(0, 1) == "H").toBe(true);
    });

    it("Validates cords", () => {
        expect(boardValidCords(-4, 504)).toBe(false);
        expect(boardValidCords(-4, 0)).toBe(false);
        expect(boardValidCords(0, 0)).toBe(true);
        expect(boardValidCords("4'fdf;dsd'9", "asmkas")).toBe(false);
    });
});
