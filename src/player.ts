export class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setScale(0.2);
        this.setCircle(80);
        this.setOffset(50,50);
    }
    updateSize(size: number){
        const growing = 1.5;
        const defaultScale = 55;
        var newSize = size * growing + defaultScale;
        this.setDisplaySize(newSize, newSize);
        this.setCircle(size)
    }
}