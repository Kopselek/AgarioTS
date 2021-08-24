export class Point extends Phaser.GameObjects.Sprite{
    throw: number;
    throwX: number;
    throwY: number;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setScale(0.05);
        this.tint = Math.random() * 0xffffff;
        this.throw = 0;
        this.throwX = 0;
        this.throwY = 0;
    }
}