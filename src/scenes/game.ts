import { GameScene } from "../gameScene";
import { Player } from "../player";
import { Ball } from "../ball";

export class Game extends GameScene{
    constructor(){
        super("game");
    }

    create ()
    {
        var points: Ball[] = []

        this.bg = this.add.tileSprite(0, 0, 1000, 1000, 'bg');
        this.physics.world.setBounds(-500,-500,1000,1000);

        const quantity = 400;
        for(var i = 0; i < quantity; i++){
            points.push(this.point = new Ball(this, Phaser.Math.Between(-450,450), Phaser.Math.Between(-450,450)))
        }

        this.player = new Player(this, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300));

        //camera
        this.cameras.main.startFollow(this.player);
        
        //physics
        this.physics.add.overlap(this.player, points, this.pointCollision);

        //keyboard input
        let pushKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

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
                points.push(this.point = new Ball(this, setPointX, setPointY, moveTo))
    
                this.player.score--;
                this.player.updateSize(this.player.score);
            }
        }, this);
        
    }

    update (time: number, deltaTime: number)
    {
        let playerScore = this.player.score
        this.events.emit('updateScore', playerScore);
        this.setCameraZoom(this.cameras.main, this.player.score);
    
        let speed = 1 - Math.min(0.7, playerScore / 200);
    
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

    pointCollision(player : Player, point : Ball) {
        point.destroy();
        player.score++;
        player.updateSize(player.score);
    }
}