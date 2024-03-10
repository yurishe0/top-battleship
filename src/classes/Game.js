import Player from "./Player";
import BotPlayer from "./BotPlayer";
import DOM from "../ui/DOM";

export default class Game {
    static start = async () => {
        const player1 = new Player("Test");
        const player2 = new BotPlayer();
        for(let i = 0; i < 5; i++) {
            player2.placeRandom();
        }

        DOM.createGameboard(player1);
        DOM.createInfoBoard();
        DOM.createGameboard(player2);

        const orientation = { value: 'vertical' };

        document.body.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            orientation.value = orientation.value === 'vertical' ? 'horizontal' : 'vertical';
        });


        for(let i = 0; i < player1.shipLengths.length; i++) {
            DOM.addHoverEffect(player1, player1.shipLengths[i], orientation);
            DOM.displayMessage("Place your ships!", `Placing: length ${player1.shipLengths[i]}`, "info");
            const result = await this.insertShip(player1, player1.shipLengths[i], orientation);
            if (result === 'invalid') {
                i--;
                DOM.displayMessage("Invalid placement!", "Attempted to place a ship out of bounds or near another ship.", "failure");
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            DOM.displayShips(player1);
        }


        DOM.displayMessage("Game begins!", `${player1.name} vs. ${player2.name}`, "info");
        await new Promise(resolve => setTimeout(resolve, 1000));

        while(!this.#isGameOver(player1, player2)) {
            if (player1.turn === true) {
                DOM.displayMessage(`${player1.name}'s turn`, 'Choose your attack...', "info")
                const attackResult = await this.#handleAttack(player1, player2);
                if (attackResult === true || attackResult === "sunk" || attackResult === "invalid") {
                    player1.turn = true;
                    player2.turn = false;
                } else {
                    player1.turn = false;
                    player2.turn = true;
                }
            } else {
                DOM.displayMessage(`${player2.name}'s turn`, "The AI is making it's move.", "info")
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
        DOM.displayMessage("Game over!", `${winner} is the winner!`, "success");
    }

    static insertShip = (player, shipLength, orientation) => {
        return new Promise(resolve => {
            DOM.applyEventListeners(player, async (x, y) => {
                const result = player.gameboard.placeShip(shipLength, x, y, orientation.value);
                DOM.removeEventListeners(player);
                if (result === 'invalid') resolve('invalid');
                resolve();
            })
        })
    }

    static #handleAttack = async (attackingPlayer, receivingPlayer) => {
        if (attackingPlayer instanceof Player) {
            return new Promise(resolve => {
                DOM.applyEventListeners(receivingPlayer, async (x, y) => {
                    const attackHit = attackingPlayer.attack(receivingPlayer, [x, y]);
                    DOM.removeEventListeners(receivingPlayer);
                    DOM.styleHit(receivingPlayer, [x, y], attackHit ? "hit" : "miss");
                    switch(attackHit) {
                        case "invalid":
                            DOM.displayMessage("The target was already shot.", "Pick another target.", "failure");
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            resolve("invalid");
                            break;
                        case "sunk":
                            DOM.displayMessage("The attack was successful!", "The ship has been sunk.", "success");
                            const sunkShip = receivingPlayer.gameboard.shipOnCoords([x, y]);
                            sunkShip.coords.forEach((pair) => {
                                DOM.styleHit(receivingPlayer, [pair[0], pair[1]], "sunk")
                            })
                            break;
                        case true:
                            DOM.displayMessage("The attack was successful!", "A ship has been hit.", "success");
                            break;
                        case false:
                            DOM.displayMessage("The attack was unsuccessful!", "It was a miss.", "failure");
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
                    DOM.displayMessage("The attack was successful!", "The ship has been sunk.", "success");
                    const sunkShip = receivingPlayer.gameboard.shipOnCoords([attackHit[1][0], attackHit[1][1]]);
                    sunkShip.coords.forEach((pair) => {
                        DOM.styleHit(receivingPlayer, [pair[0], pair[1]], "sunk")
                    })
                    break;
                case true:
                    DOM.displayMessage("The attack was successful!", "A ship has been hit.", "success");
                    break;
                case false:
                    DOM.displayMessage("The attack was unsuccessful!", "It was a miss.", "failure");
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
