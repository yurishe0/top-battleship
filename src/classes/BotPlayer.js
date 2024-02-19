import { Gameboard } from "./Gameboard.js";

export class BotPlayer {
    constructor() {
        this.gameboard = new Gameboard();
        this.name = "AI";
        this.turn = false;
    }
}

module.exports = BotPlayer;
