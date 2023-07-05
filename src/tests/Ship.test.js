import { beforeEach, describe, expect, it } from "vitest";
import Ship from "../Game/Ship.js";

describe("Ship", () => {
    let ship;

    beforeEach(() => {
        ship = Ship(3, [0, 0]); // [0,0], [0,1], [0,2]
    });

    it("Gets correct cords", () => {
        expect(ship.getCords()).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
        ]);
    });

    it("Can get destroyed", () => {
        ship.hit();
        expect(ship.isDestroyed()).toBe(false);

        ship.hit();
        ship.hit();
        expect(ship.isDestroyed()).toBe(true);
    });

    it("Checks if has cord", () => {
        expect(ship.hasCord(0, 4)).toBe(false);
        expect(ship.hasCord(0, 2)).toBe(true);
    });

    it("Can move to different cords", () => {
        ship.moveTo(0, 1);
        expect(ship.getCords()).toEqual([
            [0, 1],
            [0, 2],
            [0, 3],
        ]);
    });

    it("Doesn't move if bad cords are given", () => {
        ship.moveTo("fdsifsjdfd", "sdfdsfdsfds");
        expect(ship.getCords()).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
        ]);
    });

    it("Rotates correctly", () => {
        ship.rotate(); // Left -> Up
        expect(ship.getCords()).toEqual([
            [0, 0],
            [1, 0],
            [2, 0],
        ]);
        ship.rotate(); // Up -> Right
        expect(ship.getCords()).toEqual([
            [0, 0],
            [0, -1],
            [0, -2],
        ]);
        ship.rotate(); // Right -> Down
        expect(ship.getCords()).toEqual([
            [0, 0],
            [-1, 0],
            [-2, 0],
        ]);
        ship.rotate(); // Down -> Left
        expect(ship.getCords()).toEqual([
            [0, 0],
            [0, 1],
            [0, 2],
        ]);
    });
});
