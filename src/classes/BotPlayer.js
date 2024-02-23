import Gameboard from "./Gameboard.js";

export class BotPlayer {
    constructor() {
        this.gameboard = new Gameboard();
        this.name = "AI";
        this.turn = false;
        this.availableShips = [5, 4, 3, 3, 2];
    }

    placeRandom() {
        if (this.availableShips.length === 0) return false;
        while(true) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);
            const direction = (Math.round(Math.random() < 0.5)) ? "vertical" : "horizontal";
            if (this.gameboard.placeShip(this.availableShips[0], randomX, randomY, direction) === true) break;
        }
        this.availableShips.shift();
    }

    shootRandom(player) {
        while(true) {
            const randomX = Math.floor(Math.random() * 10);
            const randomY = Math.floor(Math.random() * 10);

            if (player.gameboard.receiveAttack([randomX, randomY]) === true) {
                this.turn = false;
                player.turn = true;
                break;
            };
        }
    }
}

module.exports = BotPlayer;
