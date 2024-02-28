import Player from "./classes/Player";
import BotPlayer from "./classes/BotPlayer";
import DOM from "./ui/DOM";

const root = document.querySelector("#root");
DOM.initializeSite(root);

const game = () => {
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
    DOM.createGameboard(player2);


    // while(!isGameOver(player1, player2)) {

    // }
}

const isGameOver = (player1, player2) => {
    return (player1.gameboard.existingShips.length === 0 || player2.gameboard.existingShips.length === 0);
}

game();


