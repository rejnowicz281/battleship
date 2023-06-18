import { describe, expect, it } from "vitest";
import Game from "../components/Game.js";

describe("Game", () => {
    const game = Game();

    it("Happy path", () => {
        expect(game).toBeTruthy();
    });
});
