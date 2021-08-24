import * as Phaser from "phaser"
import { Player } from "./player"
import { Point } from "./point"
import { IndexScene } from "./sceneI";
import { Ui } from "./ui";
var points: Point[] = []
var score : number = 0;
var oldScore : number = score;
const sceneI : IndexScene = this;

function preload ()
{
    this.load.image('ball', 'ball.png');
    this.load.image('bg', 'bg.png');
}

function create ()
{
    sceneI.bg = this.add.tileSprite(0, 0, 2000, 2000, 'bg');
    sceneI.wDown = 0;

    const quantity = 200;
    for(var i = 0; i < quantity; i++){
        points.push(
            sceneI.point = new Point(this, getRandomInt(-300,300), getRandomInt(-300,300))
            )
    }

    sceneI.player = new Player(this, getRandomInt(-300,300), getRandomInt(-300,300));
    this.cameras.main.startFollow(sceneI.player);
    cameraZoom(this.cameras.main, 1);

    this.inputKeys = this.input.keyboard.addKeys({
        w: Phaser.Input.Keyboard.KeyCodes.W,
    })

    this.scene.add('Ui', Ui, true, { score: 0 });
}
  
function update ()
{
    // variable to change if you like
    const radious = 25;
    const throwCooldown = 100;


    var size = sceneI.player.scale * 5;
    var speed = 1 - size / 10;

    let velocity = new Phaser.Math.Vector2();
    var mouseX = game.input.mousePointer.x
    var mouseY = game.input.mousePointer.y
    velocity.x = mouseX - config.width / 2;
    velocity.y = mouseY - config.height / 2;

    var mouseDistance = Math.abs(velocity.x) + Math.abs(velocity.y);
    if(mouseDistance < 100){
        var removeSpeed = 0.5 - mouseDistance / 200;
        speed = speed - removeSpeed
    }

    velocity.normalize();
    sceneI.player.x += velocity.x * speed;
    sceneI.player.y += velocity.y * speed;
    var X = sceneI.player.x;
    var Y = sceneI.player.y;

    points.forEach(function(value)
    {
        if(Math.abs(X - value.x) + Math.abs(Y - value.y) <= radious * size)
        {
            value.x += getRandomInt(-500,500);
            value.y += getRandomInt(-500,500);
            updateScore(score + 1)
        }
    });

    //score gained
    if(score > oldScore){
        oldScore = score;
        this.events.emit('updateScore', score);
        sceneI.player.updateSize(score);
        let zoom = this.cameras.main.zoom - 0.01;
        cameraZoom(this.cameras.main, zoom);
    }
    //throw point
    if(score < oldScore){
        oldScore = score;
        this.events.emit('updateScore', score);
        sceneI.player.updateSize(score);
        let zoom = this.cameras.main.zoom + 0.01;
        cameraZoom(this.cameras.main, zoom);
    }

    if(sceneI.wDown > 0){
        sceneI.wDown--;
    }

    if(this.inputKeys.w.isDown){
        if(sceneI.wDown == 0){
            if(score > 10){
                sceneI.wDown = throwCooldown + 1;
                updateScore(score - 1);
                sceneI.newPoint = new Point(this, sceneI.player.x, sceneI.player.y);
                sceneI.newPoint.throw = throwCooldown;
                sceneI.newPoint.throwX = mouseX;
                sceneI.newPoint.throwY = mouseY;
            }
        }
    }
    if(sceneI.newPoint){
        if(sceneI.newPoint.throw > 0){
            sceneI.newPoint.throw--;
            let moveTo = new Phaser.Math.Vector2();
            moveTo.x = sceneI.newPoint.throwX - config.width / 2;
            moveTo.y = sceneI.newPoint.throwY - config.height / 2;
            moveTo.normalize();
            sceneI.newPoint.x += moveTo.x * speed * 2.2 * score / 50;
            sceneI.newPoint.y += moveTo.y * speed * 2.2 * score / 50;
            if(sceneI.newPoint.throw == 0){
                points.push(sceneI.newPoint);
            }
        }
    }
}

function updateScore(newScore: number){
    score = newScore;
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function cameraZoom(camera: any, zoom: number){
    if(camera.zoom > 0.4){
        if(camera.zoom < 0.7){
            camera.zoom = zoom + 0.005;
        }else{
            camera.zoom = zoom;
        }
    }
}

var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    backgroundColor: '#d9dddc',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    render: {
		pixelArt: true,
		antialias: false,
		antialiasGL: false,
		desynchronized: false,
		roundPixels: true,
	},
    scale: {
		zoom: 2,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);