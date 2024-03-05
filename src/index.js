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


    while(!isGameOver(player1, player2)) {
        console.log(`Player's 1 turn: ${player1.turn}`);
        if (player1.turn === true) {
            await handleAttack(player1, player2);
            player1.turn = false;
            player2.turn = true;
        } else {
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
                attackingPlayer.attack(receivingPlayer, [x, y]);
                console.log(receivingPlayer.gameboard.hitShots);
                resolve();
            });
            //remove event listeners
        })
    } else {
        attackingPlayer.shootRandom(receivingPlayer);
        console.log(receivingPlayer.gameboard.hitShots);
    }
}

const isGameOver = (player1, player2) => {
    return (player1.gameboard.existingShips.length === 0 || player2.gameboard.existingShips.length === 0);
}

game();


