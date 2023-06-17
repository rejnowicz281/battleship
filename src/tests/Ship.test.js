import { beforeEach, describe, expect, it } from "vitest";
import Ship from "../components/Ship.js";

describe("Ship", () => {
    let ship;

    beforeEach(() => {
        ship = Ship([
            [0, 1],
            [1, 0],
            [2, 0],
        ]);
    });

    it("Can get hit", () => {
        expect(ship.hit(0, 1)).toBe(true);
    });

    it("Can detect illegal hits", () => {
        expect(ship.hit(40, 40)).toBe(false); // Illegal cords

        ship.hit(0, 1);
        expect(ship.hit(0, 1)).toBe(false); // Coordinate is already hit
    });

    it("Can get destroyed", () => {
        ship.hit(0, 1);
        ship.hit(1, 0);
        ship.hit(2, 0);
        expect(ship.isDestroyed()).toBe(true);
    });
});
