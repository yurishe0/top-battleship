import Gameboard from "./Gameboard.js";

export default class Player {
    constructor(name) {
        this.gameboard = new Gameboard();
        this.name = name;
        this.turn = true;
        this.shipLengths = [5, 4, 3, 3, 2];
    }

    attack(player, coordinates) {
        return player.gameboard.receiveAttack(coordinates);
    }
}
