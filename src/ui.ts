export class UI extends Phaser.Scene{
    score: number;
    scoreText: Phaser.GameObjects.Text;
    constructor(){
        super("UI");
    }

    create(data: any){
        this.score = data.score;
        
        this.scoreText = this.add.text(300, 250, "" + this.score, {
		font: '18px Courier',
		color: '#fff',
		align: 'center',
		stroke: '#000',
		strokeThickness: 2
		});

        let panel = this.scene.get('default');

        //  Listen to events from the Input Panel scene
        panel.events.on('updateScore', this.changeScore, this);
    }

    changeScore(score: string){
        this.scoreText.setText(score);
    }
}