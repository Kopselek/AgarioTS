import { GameScene } from "../gameScene";
import { Player } from "../player";
import { Ball } from "../ball";
import { updateHandler } from "../handler";

export class Game extends GameScene{
    constructor(){
        super("game");
    }

    create ()
    {
        var balls: Ball[] = []
        this.createWorld(this, balls);
        this.createPlayer(this);
        
        //add physics
        this.physics.add.overlap(this.player, balls, this.pointCollision);

        //keyboard input
        let pushKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //keyboard event
        pushKey.on('down', function (key: Phaser.Input.Keyboard.Key, event: KeyboardEvent) {
            if(this.player.score > 20){
                let radius = this.player.getRadius();
                const mouseX = this.input.mousePointer.x;
                const mouseY = this.input.mousePointer.y;
                const centerX = this.cameras.main.centerX;
                const centerY = this.cameras.main.centerY;
    
                let hitBox = new Phaser.Math.Vector2(mouseX - centerX, mouseY - centerY).normalize();
                hitBox.scale(radius * 1.4);
                let setPointX = this.player.x + hitBox.x;
                let setPointY = this.player.y + hitBox.y;
                hitBox.scale(2)
                let moveTo = new Phaser.Math.Vector2(this.player.x + hitBox.x, this.player.y + hitBox.y);
                balls.push(this.ball = new Ball(this, setPointX, setPointY, moveTo))
    
                this.player.score--;
                this.player.updateSize(this.player.score);
            }
        }, this);
        
    }

    update (time: number, deltaTime: number)
    {
        updateHandler(this);
        
        //player movement logic
        let speed = 1 - Math.min(0.7, this.player.score / 200);
        const mouseX = this.input.mousePointer.x;
        const mouseY = this.input.mousePointer.y;
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
    
        const mouseDistance = Phaser.Math.Distance.Between(mouseX, mouseY, centerX, centerY);
        if(mouseDistance < 100){
            var removeSpeed = 0.5 - mouseDistance / 200;
            speed = speed - removeSpeed
        }
    
        let direction = new Phaser.Math.Vector2(mouseX - centerX, mouseY - centerY).normalize();
        this.player.x += direction.x * speed * deltaTime / 6;
        this.player.y += direction.y * speed * deltaTime / 6;
    }

    pointCollision(player : Player, ball : Ball) {
        ball.destroy();
        player.score++;
        player.updateSize(player.score);
    }

    createWorld(scene: GameScene, balls: Ball[]){
        scene.bg = scene.add.tileSprite(0, 0, 1000, 1000, 'bg');
        scene.physics.world.setBounds(-500,-500,1000,1000);

        const quantity = 400;
        for(var i = 0; i < quantity; i++){
            balls.push(scene.ball = new Ball(scene, Phaser.Math.Between(-450,450), Phaser.Math.Between(-450,450)))
        }
    }
    
    createPlayer(scene: GameScene){
        scene.player = new Player(scene, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300));
        scene.cameras.main.startFollow(scene.player);
    }
}