import { GameScene } from "../gameScene";
import { setCameraZoom } from "../utility";
import { Player } from "../player";
import { Point } from "../point";

export default class Game extends Phaser.Scene{
    constructor(){
        super("game");
    }

    create ()
    {
        console.log('create');
        const gameScene : GameScene = this;
        var points: Point[] = []

        gameScene.bg = this.add.tileSprite(0, 0, 2000, 2000, 'bg');

        gameScene.wDown = 0;

        const quantity = 200;
        for(var i = 0; i < quantity; i++){
            points.push(
                gameScene.point = new Point(this, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300))
                )
        }

        gameScene.player = new Player(this, Phaser.Math.Between(-300,300), Phaser.Math.Between(-300,300));
        this.cameras.main.startFollow(gameScene.player);
        setCameraZoom(this.cameras.main, 1);
    }

    update ()
    {
        console.log('update')
        const gameScene : GameScene = this;
        // variable to change if you like
        const range = 25;
    
        var size = gameScene.player.scale * 5;
        var speed = 1 - size / 10;
    
        let velocity = new Phaser.Math.Vector2();
        var mouseX = gameScene.input.mousePointer.x;
        var mouseY = gameScene.input.mousePointer.y;
        velocity.x = mouseX - gameScene.cameras.main.centerX;
        velocity.y = mouseY - gameScene.cameras.main.centerY;
    
        var mouseDistance = Math.abs(velocity.x) + Math.abs(velocity.y);
        if(mouseDistance < 100){
            var removeSpeed = 0.5 - mouseDistance / 200;
            speed = speed - removeSpeed
        }
    
        const distance = velocity;
        distance.normalize();

        gameScene.player.x += distance.x * speed;
        gameScene.player.y += distance.y * speed;
        var X = gameScene.player.x;
        var Y = gameScene.player.y;
    }
}