import Player from '../src/classes/Player.js';

describe("test", () => {
    let testPlayer;

    beforeEach(() => {
        testPlayer = new Player("Bob");
    })

    it("should correctly create a player class", () => {
        expect(testPlayer.name).toBe("Bob");
    })
})
