import Gameboard from "./Gameboard.js";

export class Player {
    constructor(name) {
        this.gameboard = new Gameboard();
        this.name = name;
        this.turn = true;
    }

    attack(player, coordinates) {
        if (player.gameboard.receiveAttack(coordinates)) {
            this.turn = false;
            player.turn = true;
        };
    }
}

module.exports = Player;
