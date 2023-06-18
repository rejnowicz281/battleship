import { beforeEach, describe, expect, it } from "vitest";
import Player from "../components/Player.js";
import Ship from "../components/Ship.js";

describe("Player", () => {
    let player;

    beforeEach(() => {
        player = Player();
    });

    it("Adds ship", () => {
        player.addShip(Ship(2, [0, 0]));
    });

    it("Returns false if adding illegal ship", () => {
        player.addShip(Ship(2, [0, 0]));
        expect(player.addShip(Ship(2, [0, 0]))).toBe(false);
    });

    it("Detects if all ships are destroyed", () => {
        player.addShip(Ship(2, [0, 0])); // [0, 0], [0, 1]
        player.addShip(Ship(1, [1, 0])); // [1, 0]
        player.getShips()[0].hit();
        player.getShips()[0].hit();
        expect(player.allShipsDestroyed()).toBe(false);
        player.getShips()[1].hit();
        expect(player.allShipsDestroyed()).toBe(true);
    });
});
