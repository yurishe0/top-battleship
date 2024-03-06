import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(name) {
        this.gameboard = new Gameboard();
        this.name = name;
        this.turn = true;
    }

    attack(player, coordinates) {
        return player.gameboard.receiveAttack(coordinates);
    }
}
