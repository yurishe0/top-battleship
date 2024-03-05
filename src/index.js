import Player from "./classes/Player";
import BotPlayer from "./classes/BotPlayer";
import DOM from "./ui/DOM";

const root = document.querySelector("#root");
DOM.initializeSite(root);

const game = async () => {
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

    while(!isGameOver(player1, player2)) {
        if (player1.turn === true) {
            DOM.displayMessage(`${player1.name}'s turn`, 'Choose your attack...', "message-info")
            await handleAttack(player1, player2);
            player1.turn = false;
            player2.turn = true;
        } else {
            DOM.displayMessage(`${player2.name}'s turn`, "The AI is making it's move.", "message-info")
            await new Promise(resolve => setTimeout(resolve, 1000));
            await handleAttack(player2, player1);
            player1.turn = true;
            player2.turn = false;
        }
    }
}

const handleAttack = async (attackingPlayer, receivingPlayer) => {
    if (attackingPlayer instanceof Player) {
        return new Promise(resolve => {
            DOM.applyEventListeners(receivingPlayer, async (x, y) => {
                const attackHit = attackingPlayer.attack(receivingPlayer, [x, y]);
                DOM.styleHit(receivingPlayer, [x, y], attackHit ? "hit" : "miss");
                resolve();
            });
            //remove event listeners
        })
    } else {
        const attackHit = attackingPlayer.shootRandom(receivingPlayer);
        DOM.styleHit(receivingPlayer, [attackHit[1][0], attackHit[1][1]], attackHit[0] ? "hit" : "miss");
    }
}

const isGameOver = (player1, player2) => {
    return (player1.gameboard.existingShips.length === 0 || player2.gameboard.existingShips.length === 0);
}

game();


