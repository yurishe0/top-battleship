export default class DOM {
    static initializeSite = (root) => {
        const header = document.createElement('div');
        header.setAttribute('id', 'header');
        const h1 = document.createElement('h1');
        h1.textContent = "Battleship";

        const main = document.createElement('div');
        main.setAttribute('id', 'main');

        const footer = document.createElement('div');
        footer.setAttribute('id', 'footer');
        const footerSpan = document.createElement('span');
        footerSpan.textContent = "Crated by yurishe";

        header.appendChild(h1);
        footer.appendChild(footerSpan);

        root.append(header, main, footer);
    }

    static createGameboard = (player) => {
        const main = document.querySelector('#main');
        const boardContainer = document.createElement('div');
        boardContainer.classList.add("board-container");
        const playerName = document.createElement('span');
        playerName.classList.add("player-name");
        playerName.textContent = player.name;

        const gameboardElement = document.createElement('div');
        gameboardElement.classList.add("gameboard");
        gameboardElement.setAttribute('id', player.name);
        for(let i = 9; i >= 0; i--) {
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
        main.appendChild(boardContainer);

        this.displayShips(player);
    }

    static displayShips = (player) => {
        player.gameboard.existingShips.forEach(ship => {
            ship.coords.forEach(coord => {
                const cell = document.querySelector(`#${player.name} [x="${coord[0]}"][y="${coord[1]}"]`);
                cell.classList.add("ship");
            })
        })
    }
}
