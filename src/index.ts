import * as Phaser from "phaser"
import { GamePreload } from "./scenes/gamePreload";
import { Game } from "./scenes/game";

var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    backgroundColor: '#d9dddc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [GamePreload, Game],
    render: {
		pixelArt: true,
		antialias: false,
		antialiasGL: false,
		desynchronized: false,
		roundPixels: true,
	},
    scale: {
		zoom: 2,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);