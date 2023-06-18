import { describe, expect, it } from "vitest";
import Player from "../components/Player.js";

describe("Player", () => {
    const player = Player();

    it("Happy path", () => {
        expect(player).toBeTruthy();
    });
});
