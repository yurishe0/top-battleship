const { experiments } = require('webpack');
const Ship = require('../src/classes/Ship.js');

describe("ship tests", () => {
    let testShip;

    beforeEach(() => {
        testShip = new Ship(3);
    })
    it("should assign the correct name", () => {
        expect(testShip.name).toBe("Battleship");
    })
    it("should receive hits", () => {
        testShip.hit();
        expect(testShip.timesHit).toBe(1);
    })
    it("should receive multiple hits", () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.timesHit).toBe(2);
    })
    it("should know if it's not sunk", () => {
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    })
    it("should know if it's sunk", () => {
        testShip.timesHit = 3;
        expect(testShip.isSunk()).toBe(true);
    })
})
