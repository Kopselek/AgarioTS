import { GameScene } from "../gameScene";
import { Player } from "../player";
import { Point } from "../point";

export class Game extends GameScene{
    constructor(){
        super("game");
    }

    create ()
    {
        var points: Point[] = []

        this.bg = this.add.tileSprite(0, 0, 1000, 1000, 'bg');
        this.physics.world.setBounds(-500,-500,1000,1000);

        const quantity = 400;
        for(var i = 0; i < quantity; i++){
            points.push(this.point = new Point(this, Phaser.Math.Between(-450,450), Phaser.Math.Between(-450,450)))
        }

        this.player = new Player(this, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300));

        //camera
        this.cameras.main.startFollow(this.player);
        
        //physics
        this.physics.add.overlap(this.player, points, this.pointCollision);
        
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

    pointCollision(player : Player, point : Point) {
        point.destroy();
        player.score++;
        player.updateSize(player.score);
    }
}