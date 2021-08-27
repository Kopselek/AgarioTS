import * as Phaser from "phaser"
import { GamePreload } from "./scenes/gamePreload";
import { Game } from "./scenes/game";

var config = {
    type: Phaser.AUTO,
    width: 1440,
    height: 860,
    backgroundColor: '#d9dddc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [GamePreload, Game],
    render: {
		pixelArt: true,
		antialias: true,
		antialiasGL: true,
		roundPixels: true,
	},
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH

    }
};

var game = new Phaser.Game(config);