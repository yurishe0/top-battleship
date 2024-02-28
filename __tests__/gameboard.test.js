import Gameboard from "../src/classes/Gameboard.js";
import Ship from "../src/classes/Ship.js";

describe("gameboard tests", () => {
    let testGameboard;
    let testShip;

    beforeEach(() => {
        testGameboard = new Gameboard();
        testShip = new Ship(3);
    })

    it("should be able to place ships verticaly", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        testShip.coords = [[3, 3], [3, 4], [3, 5]];
        expect(testGameboard.board[3][3]).toEqual({ship: testShip});
    })

    it("should be able to place ships horizontally", () => {
        testGameboard.placeShip(3, 3, 3, "horizontal");
        testShip.coords = [[3, 3], [4, 3], [5, 3]];
        expect(testGameboard.board[3][3]).toEqual({ship: testShip});
    })

    it("should correctly track it's own coorinates", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        expect(testGameboard.board[3][3].ship.coords.length).toBe(3);
    })

    it("should prevent from placing out of bounds", () => {
        expect(testGameboard.placeShip(3, 0, 8, "vertical")).toBe("invalid")
    })

    it("should prevent from placing a ship adjacent to an existing ship", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        expect(testGameboard.placeShip(3, 4, 4, "vertical")).toBe("invalid");
    })

    it("should receive an attack and send it to the correct ship", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        expect(testGameboard.receiveAttack([3, 3])).toBe(true);
    })
    it("should be able to tell whether a shot was missed", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        expect(testGameboard.receiveAttack([7, 7])).toEqual(false);
    })

    it("should prevent from shooting an already shot position", () => {
        testGameboard.receiveAttack([3, 3]);
        expect(testGameboard.receiveAttack([3, 3])).toEqual('invalid');
    })

    it("should know when a ship is fully sunk", () => {
        testGameboard.placeShip(3, 3, 3, "vertical");
        testGameboard.receiveAttack([3, 3]);
        testGameboard.receiveAttack([3, 4]);
        testGameboard.receiveAttack([3, 5]);

        expect(testGameboard.existingShips.length).toEqual(0);
    })
})
