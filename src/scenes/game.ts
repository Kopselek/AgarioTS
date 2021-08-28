import { GameScene } from "../gameScene";
import { Player } from "../player";
import { Ball } from "../ball";

export class Game extends GameScene{
    constructor(){
        super("game");
    }

    create ()
    {
        var balls: Ball[] = []
        this.createWorld(this, balls);
        this.createPlayer(this);
        
        this.physics.add.overlap(this.player, balls, this.onPointCollision);

        let pushKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        pushKey.on('down', function (key: Phaser.Input.Keyboard.Key, event: KeyboardEvent) {
            if(this.player.score > 20){
                let radius = this.player.getRadius();
                const {centerX, centerY} = this.cameras.main;
                const {x, y} = this.input.mousePointer;
        
                let hitBox = new Phaser.Math.Vector2(x - centerX, y - centerY).normalize();
                hitBox.scale(radius * 1.4);
                let direction = hitBox.clone().scale(2);
                let moveTo = new Phaser.Math.Vector2(this.player.x + direction.x, this.player.y + direction.y);
                balls.push(this.ball = new Ball(this, this.player.x + hitBox.x, this.player.y + hitBox.y, moveTo))
        
                this.player.score--;
                this.player.updateSize(this.player.score);
                
            }
         },this);
        
    }

    update (time: number, deltaTime: number)
    {
        this.events.emit('updateScore', this.player.score);
        this.setCameraZoom(this.cameras.main, this.player.score);
        
        let speed = 1 - Math.min(0.7, this.player.score / 200);
        const {centerX, centerY} = this.cameras.main;
        const {x, y} = this.input.mousePointer;
    
        const mouseDistance = Phaser.Math.Distance.Between(x, y, centerX, centerY);
        if(mouseDistance < 100){
            var removeSpeed = 0.5 - mouseDistance / 200;
            speed = speed - removeSpeed
        }
        
        let direction = new Phaser.Math.Vector2(x - centerX, y - centerY).normalize();
        this.player.x += direction.x * speed * deltaTime / 6;
        this.player.y += direction.y * speed * deltaTime / 6;
    }

    private onPointCollision(player : Player, ball : Ball) {
        ball.destroy();
        player.score++;
        player.updateSize(player.score);
    }

    private createWorld(scene: GameScene, balls: Ball[]){
        scene.bg = scene.add.tileSprite(0, 0, 1000, 1000, 'bg');
        scene.physics.world.setBounds(-500,-500,1000,1000);

        const quantity = 400;
        for(var i = 0; i < quantity; i++){
            balls.push(scene.ball = new Ball(scene, Phaser.Math.Between(-450,450), Phaser.Math.Between(-450,450)))
        }
    }
    
    private createPlayer(scene: GameScene){
        scene.player = new Player(scene, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300));
        scene.cameras.main.startFollow(scene.player);
    }
}