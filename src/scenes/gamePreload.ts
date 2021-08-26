import { GameScene } from "../gameScene";

export class GamePreload extends GameScene{
    constructor(){
        super("gamePreload");
    }

    preload () {
        this.load.image('ball', 'assets/ball.png');
        this.load.image('bg', 'assets/bg.png');
    }

    create() {
        this.scene.start('game');
    }
}