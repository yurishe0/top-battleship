const Gameboard = require("../src/classes/Gameboard.js");
const Ship = require("../src/classes/Ship.js");

describe("gameboard tests", () => {
    let testGameboard;
    let testShip;

    beforeEach(() => {
        testGameboard = new Gameboard();
        testShip = new Ship(3);
    })

    it("should be able to place ships verticaly", () => {
        testGameboard.placeShip(testShip, 3, 3, "vertical");
        expect(testGameboard.board[3][3]).toEqual({ship: testShip});
    })

    it("should be able to place ships horizontally", () => {
        testGameboard.placeShip(testShip, 3, 3, "horizontal");
        expect(testGameboard.board[3][3]).toEqual({ship: testShip});
    })

    it("should prevent from placing out of bounds", () => {
        expect(testGameboard.placeShip(testShip, 0, 8, "vertical")).toBe("out of bounds")
    })
})
