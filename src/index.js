import DOM from "./ui/DOM";
import Game from "./classes/Game";

const root = document.querySelector("#root");
DOM.initializeSite(root);

Game.start();
