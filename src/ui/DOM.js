export default class DOM {
    static createGameboard = (player) => {
        const boardContainer = document.createElement('div');
        const playerName = document.createElement('span');
        playerName.textContent = player.name;

        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add("gameboard");
        for(let i = 9; i > 0; i--) {
            for(let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.classList.add("cell");
                cell.setAttribute('x', j);
                cell.setAttribute('y', i);
                gameboardElement.appendChild(cell);
            }
        }
        boardContainer.appendChild(playerName);
        boardContainer.appendChild(gameboardElement);
        return boardContainer;
    }
}
