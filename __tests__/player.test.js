const Player = require('../src/classes/Player.js');

describe("test", () => {
    let testPlayer;

    beforeEach(() => {
        testPlayer = new Player("Bob");
    })

    // just a random test to showcase the test error
    it("should correctly create a player class", () => {
        expect(testPlayer.name).toBe("Bob");
    })
})
