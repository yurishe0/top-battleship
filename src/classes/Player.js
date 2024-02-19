import { Gameboard } from "./Gameboard.js";

export class Player {
    constructor(name) {
        this.gameboard = new Gameboard();
        this.name = name;
        this.turn = false;
    }

    attack(player, coordinates) {
        player.gameboard.receiveAttack(coordinates);
    }
}

module.exports = Player;
