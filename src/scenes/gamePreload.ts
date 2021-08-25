import { GameScene } from "../gameScene";

export default class GamePreload extends Phaser.Scene{
    constructor(){
        super("gamePreload");
    }

    preload () {
        console.log('preload');
        this.load.image('ball', 'assets/ball.png');
        this.load.image('bg', 'assets/bg.png');
    }

    create() {
        this.scene.start('game');
    }
}