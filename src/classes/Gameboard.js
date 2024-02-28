import Ship from "./Ship";

export default class Gameboard {
    constructor() {
        this.board = new Array(10).fill(undefined).map(() => new Array(10).fill(undefined));
        this.existingShips = [];
        this.hitShots = [];
        this.missedShots = [];
    }

    #isOutOfBounds(ship, x, y, direction) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return true;
        for(let i = 0; i < ship.length; i++) {
            if (direction === "vertical") y++;
            else x++;
        }
        if (x > 10 || y > 10) return true;
        return false;
    }

    #hasAdjacentShips(ship, x, y, direction) {
        const offsets = [
            [-1, 1], [0, 1], [1, 1],
            [-1, 0], [0, 0], [1, 0],
            [-1, -1], [0, -1], [1, -1]
        ]

        for(let i = 0; i < ship.length; i++) {
            const [shipX, shipY] =  (direction === "vertical") ? [x, y + i] : [x + i, y];

            for(const [offsetX, offsetY] of offsets) {
                const adjacentX = shipX + offsetX;
                const adjacentY = shipY + offsetY;

                if (adjacentX >= 0 && adjacentX <= 9 && adjacentY >= 0 && adjacentY <= 9) {
                    if (this.board[adjacentX][adjacentY] !== undefined) return true;
                }
            }
        }
        return false;
    }

    placeShip(shipLength, x, y, direction) {
        const ship = new Ship(shipLength);
        if (this.#isOutOfBounds(ship, x, y, direction)) return "invalid";
        if (this.#hasAdjacentShips(ship, x, y, direction)) return "invalid";
        for(let i = 0; i < ship.length; i++) {
            if (direction === "vertical") {
                ship.coords.push([x, y + i]);
                this.board[x][y + i] = {ship};
            } else {
                ship.coords.push([x + i, y]);
                this.board[x + i][y] = {ship};
            }
        }
        this.existingShips.push(ship);
        return true;
    }

    receiveAttack([x, y]) {
        if (this.#checkIfShot([x, y])) return 'invalid';

        if (this.board[x][y] == undefined) {
            this.missedShots.push([x, y]);
            return false;
        }

        this.board[x][y].ship.hit();
        this.hitShots.push([x, y]);
        if (this.board[x][y].ship.sunk) this.existingShips = this.existingShips.filter(ship => ship !== this.board[x][y].ship);
        if (this.existingShips.length === 0) return "no ships";
        return true;
    }

    #checkIfShot([x, y]) {
        return this.hitShots.some(arr => arr[0] === x && arr[1] === y) ||
               this.missedShots.some(arr => arr[0] === x && arr[1] === y);
    }
}
