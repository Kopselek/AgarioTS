import { GameScene } from "./gameScene";

export class UI extends GameScene{
    score: number = 0;
    scoreText: Phaser.GameObjects.Text;
    constructor(){
        super("UI");
    }

    create(){
        this.scoreText = this.add.text(50, 800, "Score: " + this.score, {
		font: '50px Courier',
		color: '#fff',
		align: 'center',
		stroke: '#000',
		strokeThickness: 2
		});

        var mainScene = this.scene.get('game');
        mainScene.events.on('updateScore', this.updateScore, this);
    }

    updateScore(score: number){
        this.scoreText.setText("Score: " + score);
    }
}