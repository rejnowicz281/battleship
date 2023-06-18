import { describe, expect, it } from "vitest";
import Board from "../components/Board.js";

describe("Board", () => {
    const board = Board();

    it("Can hit and miss", () => {
        board.hit(0, 1);
        expect(board.getCell(0, 1)).toBe("M");
    });

    it("Check's cell value", () => {
        board.setCell(0, 1, "S");
        expect(board.isCellAt(0, 0, " ")).toBe(true);
        expect(board.isCellAt(0, 1, "S")).toBe(true);
    });

    it("Hits cell correctly", () => {
        board.setCell(0, 1, "S");
        board.hit(0, 1);
        expect(board.isCellAt(0, 1, "H")).toBe(true);
    });

    it("Validates cords", () => {
        expect(board.validCords(-4, 504)).toBe(false);
        expect(board.validCords(-4, 0)).toBe(false);
        expect(board.validCords(0, 0)).toBe(true);
        expect(board.validCords("4'fdf;dsd'9", "asmkas")).toBe(false);
    });
});
