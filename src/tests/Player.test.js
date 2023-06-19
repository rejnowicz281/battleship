import { beforeEach, describe, expect, it } from "vitest";
import Player from "../components/Player.js";

describe("Player", () => {
    let player;

    beforeEach(() => {
        player = Player();
    });

    describe("Add ship", () => {
        it("Returns appropriate boolean based on given ship", () => {
            expect(player.placeShip(2, [0, 0])).toBe(true);
            expect(player.placeShip(2, [0, 0])).toBe(false); // Another ship is in the same position
        });
    });

    it("Returns false if adding illegal ship", () => {
        player.placeShip(2, [0, 0]);
        expect(player.placeShip(2, [0, 0])).toBe(false);
    });

    it("Detects if all ships are destroyed", () => {
        player.placeShip(2, [0, 0]); // [0, 0], [0, 1]
        player.placeShip(1, [1, 0]); // [1, 0]
        player.getShips()[0].hit();
        player.getShips()[0].hit();
        expect(player.allShipsDestroyed()).toBe(false);
        player.getShips()[1].hit();
        expect(player.allShipsDestroyed()).toBe(true);
    });
});
