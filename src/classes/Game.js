import Player from "./Player";
import BotPlayer from "./BotPlayer";
import DOM from "../ui/DOM";

export default class Game {
    static start = async () => {
        const player1 = new Player("Test");
        player1.gameboard.placeShip(5, 3, 3, "vertical");
        player1.gameboard.placeShip(4, 1, 1, "horizontal");
        player1.gameboard.placeShip(3, 5, 4, "horizontal");
        player1.gameboard.placeShip(3, 5, 6, "horizontal");
        player1.gameboard.placeShip(2, 8, 8, "vertical");

        const player2 = new BotPlayer();
        for(let i = 0; i < 5; i++) {
            player2.placeRandom();
        }

        DOM.createGameboard(player1);
        DOM.createInfoBoard();
        DOM.createGameboard(player2);

        DOM.displayMessage("Game begins!", `${player1.name} vs. ${player2.name}`, "message-info");
        await new Promise(resolve => setTimeout(resolve, 1000));

        while(!this.#isGameOver(player1, player2)) {
            if (player1.turn === true) {
                DOM.displayMessage(`${player1.name}'s turn`, 'Choose your attack...', "message-info")
                const attackResult = await this.#handleAttack(player1, player2);
                if (attackResult === true || attackResult === "sunk") {
                    player1.turn = true;
                    player2.turn = false;
                } else {
                    player1.turn = false;
                    player2.turn = true;
                }
            } else {
                DOM.displayMessage(`${player2.name}'s turn`, "The AI is making it's move.", "message-info")
                await new Promise(resolve => setTimeout(resolve, 1000));
                const attackResult = await this.#handleAttack(player2, player1);
                if (attackResult === true || attackResult === "sunk") {
                    player1.turn = false;
                    player2.turn = true;
                } else {
                    player1.turn = true;
                    player2.turn = false;
                }
            }
        }
        const winner = (player1.gameboard.existingShips.length === 0) ? player2.name : player1.name;
        DOM.displayMessage("Game over!", `${winner} is the winner!`, "message-success");
    }

    static #handleAttack = async (attackingPlayer, receivingPlayer) => {
        if (attackingPlayer instanceof Player) {
            return new Promise(resolve => {
                DOM.applyEventListeners(receivingPlayer, async (x, y) => {
                    const attackHit = attackingPlayer.attack(receivingPlayer, [x, y]);
                    DOM.removeEventListeners(receivingPlayer);
                    DOM.styleHit(receivingPlayer, [x, y], attackHit ? "hit" : "miss");
                    switch(attackHit) {
                        case "sunk":
                            DOM.displayMessage("The attack was successful!", "The ship has been sunk.", "message-success");
                            const sunkShip = receivingPlayer.gameboard.shipOnCoords([x, y]);
                            sunkShip.coords.forEach((pair) => {
                                DOM.styleHit(receivingPlayer, [pair[0], pair[1]], "sunk")
                            })
                            break;
                        case true:
                            DOM.displayMessage("The attack was successful!", "A ship has been hit.", "message-success");
                            break;
                        case false:
                            DOM.displayMessage("The attack was unsuccessful!", "It was a miss.", "message-failure");
                            break;
                    }
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    resolve(attackHit);
                });
            })
        } else {
            const attackHit = attackingPlayer.shootRandom(receivingPlayer);
            DOM.styleHit(receivingPlayer, [attackHit[1][0], attackHit[1][1]], attackHit[0] ? "hit" : "miss");
            switch(attackHit[0]) {
                case "sunk":
                    DOM.displayMessage("The attack was successful!", "The ship has been sunk.", "message-success");
                    const sunkShip = receivingPlayer.gameboard.shipOnCoords([attackHit[1][0], attackHit[1][1]]);
                    sunkShip.coords.forEach((pair) => {
                        DOM.styleHit(receivingPlayer, [pair[0], pair[1]], "sunk")
                    })
                    break;
                case true:
                    DOM.displayMessage("The attack was successful!", "A ship has been hit.", "message-success");
                    break;
                case false:
                    DOM.displayMessage("The attack was unsuccessful!", "It was a miss.", "message-failure");
                    break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            return attackHit[0];
        }
    }

    static #isGameOver = (player1, player2) => {
        return (player1.gameboard.existingShips.length === 0 || player2.gameboard.existingShips.length === 0);
    }
}
