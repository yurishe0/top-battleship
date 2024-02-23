import BotPlayer from "../src/classes/BotPlayer";
import Player from "../src/classes/Player";

describe("AI test", () => {
    let testBot;

    beforeEach(() => {
        testBot = new BotPlayer;

        // mock Math.random to return the value 0.3 (evaulates to index 3) for testing purposes
        originalMath = Math.random;
        Math.random = jest.fn(() => 0.3);
    })

    afterEach(() => {
        Math.random = originalMath;
    })

    it("should be able to make a random move", () => {
        testBot.placeRandom();
        expect(testBot.gameboard.board[3][3]).not.toBe(undefined);
    })

    it("should be able to place 5 random ships", () => {
        Math.random = jest.fn(() => 0);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.2);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.4);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.6);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.8);
        testBot.placeRandom();

        expect(testBot.gameboard.existingShips.length).toBe(5);
    })

    it("should not be able to place a sixth ship", () => {
        Math.random = jest.fn(() => 0);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.2);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.4);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.6);
        testBot.placeRandom();

        Math.random = jest.fn(() => 0.8);
        testBot.placeRandom();

        expect(testBot.placeRandom()).toBe(false);
    })

    it("should shoot a random coordinate", () => {
        let testPlayer = new Player("Tester");
        testPlayer.gameboard.placeShip(3, 3, 3, "vertical");

        testBot.shootRandom(testPlayer);
        expect(testPlayer.gameboard.board[3][3].ship.timesHit).toBe(1);
    })
})
