import Gameboard from "./Gameboard.js";

export class BotPlayer {
    constructor() {
        this.gameboard = new Gameboard();
        this.name = "AI";
        this.turn = false;
        this.availableShips = [5, 4, 3, 3, 2];
    }

    placeRandom() {
        while(true) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);
            const direction = (randomX % 2 === 0) ? "vertical" : "horizontal";
            if(this.gameboard.placeShip(this.availableShips[0], randomX, randomY, direction) === true) break;
        }
        this.availableShips.shift();
    }
}

module.exports = BotPlayer;
