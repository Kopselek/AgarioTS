export class Point extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number, moveTo?: Phaser.Math.Vector2){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.tint = Math.random() * 0xffffff;
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setScale(0.05);
        this.setCircle(80);
        this.setOffset(50,50);
        if(moveTo){
            console.log(moveTo)
            console.log(x, y)
            scene.physics.moveTo(this, moveTo.x, moveTo.y, 10, 200);
        }
    }
}