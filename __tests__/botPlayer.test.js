import BotPlayer from "../src/classes/BotPlayer";

describe("AI test", () => {
    let testBot;

    beforeAll(() => {
        testBot = new BotPlayer;

        // mock Math.random to return the value 0.3 (evaulates to index 3) for testing purposes
        originalMath = Math.random;
        Math.random = jest.fn(() => 0.3);
    })

    afterAll(() => {
        Math.random = originalMath;
    })

    it("should be able to make a random move", () => {
        testBot.placeRandom();
        expect(testBot.gameboard.board[3][3]).not.toBe(undefined);
    })
})
