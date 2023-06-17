import { describe, expect, it } from "vitest";
import Board from "../components/Board.js";

describe("Board", () => {
    const board = Board();

    it("Populates board", () => {
        board.populate(0, 1);
        expect(board.isPopulated(0, 1)).toBe(true);
    });

    it("Detects unpopulated cords", () => {
        expect(board.isPopulated(0, 0)).toBe(false);
    });
});
