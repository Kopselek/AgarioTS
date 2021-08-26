export class Point extends Phaser.Physics.Arcade.Sprite{
    throw: number;
    throwX: number;
    throwY: number;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.tint = Math.random() * 0xffffff;
        this.setScale(0.05);
        this.setCircle(80);
        this.setOffset(50,50);
    }
}