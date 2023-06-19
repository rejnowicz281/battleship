import { describe, expect, it } from "vitest";
import Game from "../components/Game.js";

describe("Game", () => {
    const game = Game();

    describe("getPlayer", () => {
        it("Gets correct player", () => {
            expect(game.getPlayer("Human")).not.toBe(null);
        });

        it("Returns null on incorrect player name given", () => {
            expect(game.getPlayer("NO SUCH PLAYER?")).toBe(null);
        });
    });

    describe("playTurn", () => {
        it("Given coordinates, returns appropriate boolean", () => {
            expect(game.playTurn(0, 0)).toBe(true);
            expect(game.playTurn(0, 100)).toBe(false);
        });
    });
});
