export class Gameboard {
    constructor() {
        this.board = new Array(10).fill(undefined).map(() => new Array(10).fill(undefined));
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

    placeShip(ship, x, y, direction) {
        if (this.#checkIfOutOfBounds(ship, x, y, direction)) return "out of bounds";
        for(let i = 0; i < ship.length; i++) {
            if (direction === "vertical") {
                this.board[x][y + i] = {ship};
            } else {
                this.board[x + i][y] = {ship};
            }
        }
    }
}

module.exports = Gameboard;
