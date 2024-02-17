export class Ship {
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
        this.name = this.#asignName(length);
    }

    #asignName(length) {
        switch(length) {
            case 2:
                return "Destroyer";
            case 3:
                return "Battleship";
            case 4:
                return "Cruiser";
            case 5:
                return "Aircraft Carrier";
            default:
                return "Unknown ship";
        }
    }

    hit() {
        this.timesHit += 1;
        if (this.isSunk()) this.sunk = true;
    }

    isSunk() {
        return (this.timesHit === this.length) ? true : false;
    }

}

module.exports = Ship;
