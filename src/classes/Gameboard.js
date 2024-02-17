import Ship from "./Ship";

export class Gameboard {
    constructor() {
        this.board = new Array(10).fill(undefined).map(() => new Array(10).fill(undefined));
        this.existingShips = [];
        this.hitShots = [];
        this.missedShots = [];
    }

    #checkIfOutOfBounds(ship, x, y, direction) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return true;
        for(let i = 0; i < ship.length; i++) {
            if (direction === "vertical") y++;
            else x++;
        }
        if (x > 9 || y > 9) return true;
        return false;
    }

    placeShip(shipLength, x, y, direction) {
        const ship = new Ship(shipLength);
        if (this.#checkIfOutOfBounds(ship, x, y, direction)) return "out of bounds";
        for(let i = 0; i < ship.length; i++) {
            if (direction === "vertical") {
                this.board[x][y + i] = {ship};
            } else {
                this.board[x + i][y] = {ship};
            }
        }
        this.existingShips.push(ship);
    }

    receiveAttack([x, y]) {
        if (this.#checkIfShot([x, y])) return 'already shot';

        if (this.board[x][y] == undefined) {
            this.missedShots.push([x, y]);
            return false;
        }

        this.board[x][y].ship.hit();
        this.hitShots.push([x, y]);
        if (this.board[x][y].ship.sunk) this.existingShips = this.existingShips.filter(ship => ship !== this.board[x][y].ship);
        return this.board[x][y].ship.timesHit;
    }

    #checkIfShot([x, y]) {
        return this.hitShots.some(arr => arr[0] === x && arr[1] === y) ||
               this.missedShots.some(arr => arr[0] === x && arr[1] === y);
    }
}

module.exports = Gameboard;
