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
        this.setCameraZoom(this.cameras.main, 2);
        
        //physics
        this.physics.add.overlap(this.player, points, this.pointCollision);
        
    }

    update (time: number, deltaTime: number)
    {
        const gameScene : GameScene = this;
    
        const size = gameScene.player.scale * 5;
        let speed = 1 - this.player.score / 200;
    
        const mouseX = gameScene.input.mousePointer.x;
        const mouseY = gameScene.input.mousePointer.y;
        const centerX = gameScene.cameras.main.centerX;
        const centerY = gameScene.cameras.main.centerY;
    
        const mouseDistance = Phaser.Math.Distance.Between(mouseX, mouseY, centerX, centerY);
        if(mouseDistance < 100){
            var removeSpeed = 0.5 - mouseDistance / 200;
            speed = speed - removeSpeed
        }
    
        let direction = new Phaser.Math.Vector2(mouseX - centerX, mouseY - centerY).normalize();
        gameScene.player.x += direction.x * speed * deltaTime / 6;
        gameScene.player.y += direction.y * speed * deltaTime / 6;
    }

    pointCollision(player : Player, point : Point) {
        point.destroy();
        player.score++;
        player.updateSize(player.score);
    }
}