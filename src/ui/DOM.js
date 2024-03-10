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

        if(player.name != "AI") this.displayShips(player);
    }

    static displayShips = (player) => {
        player.gameboard.existingShips.forEach(ship => {
            ship.coords.forEach(coord => {
                const cell = document.querySelector(`#${player.name} [x="${coord[0]}"][y="${coord[1]}"]`);
                cell.classList.add("ship");
            })
        })
    }

    static createInfoBoard = () => {
        const main = document.querySelector('#main');
        const infoContainer = document.createElement('div');
        infoContainer.setAttribute('id', 'info-container');
        main.append(infoContainer);
    }

    static displayMessage = (title, message, type) => {
        const infoContainer = document.querySelector("#info-container");
        infoContainer.innerHTML = "";
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message");
        // message-info, message-error, message-success, message-failure
        messageContainer.classList.add(type);

        const h2 = document.createElement("h2");
        h2.textContent = title;

        const span = document.createElement("span");
        span.textContent= message;

        messageContainer.append(h2, span);
        infoContainer.appendChild(messageContainer);
    }

    static applyEventListeners(player, callback) {
        const gameboard = document.querySelector(`#${player.name}`);
        const cells = gameboard.children;
        Array.from(cells).forEach((cell) => {
            cell.addEventListener("click", (e) => {
                const element = e.target;
                const x = element.getAttribute('x');
                const y = element.getAttribute('y');
                callback(x, y);
            });
        });
    }

    static removeEventListeners(player) {
        const gameboard = document.querySelector(`#${player.name}`);
        const cells = gameboard.children;
        Array.from(cells).forEach((cell) => {
            const clonedCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(clonedCell, cell);
        });
    }

    static styleHit = (player, coordinates, type) => {
        const cell = document.querySelector(`#${player.name} [x="${coordinates[0]}"][y="${coordinates[1]}"]`);
        cell.classList.add(type);
    }

    static addHoverEffect = (player, shipLength, shipOrientation) => {
        const gameboard = document.querySelector(`#${player.name}`);
        const cells = gameboard.children;
        let elements = []

        const hoverEffect = (cell) => {
            const x = Number(cell.getAttribute("x"));
            const y = Number(cell.getAttribute("y"));

                if (shipOrientation.value === "vertical") {
                    for(let i = 0; i < shipLength; i++) {
                        if (y + i <= 9) elements.push(document.querySelector(`[x="${x}"][y="${y + i}"]`));
                    }
                }
                else {
                    for(let i = 0; i < shipLength; i++) {
                        if (x + i <= 9) elements.push(document.querySelector(`[x="${x + i}"][y="${y}"]`));
                    }
                }

            elements.forEach((element) => element.classList.add("selecting"));
        }

        const clearEffect = () => {
            elements.forEach((element) => element.classList.remove("selecting"));
            elements = [];
        }

        Array.from(cells).forEach((cell) => {
            cell.addEventListener("mouseover", () => {
                hoverEffect(cell);
            })
            cell.addEventListener("mouseout", () => {
                clearEffect(cell);
            });
            cell.addEventListener("click", () => {
                clearEffect(cell);
            });
        });
    }

    static addRestartButton = (cb) => {
        const messageContainer = document.querySelector(".message");
        const button = document.createElement("button");
        button.textContent = "Restart";
        button.addEventListener("click", cb);
        messageContainer.appendChild(button);
    }
}
