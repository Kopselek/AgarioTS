export class Player extends Phaser.Physics.Arcade.Sprite{
    score = 1;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setScale(0.2);
        this.setCircle(95);
        this.setOffset(35,35);
    }
    updateSize(size: number){
        const growing = 1.5;
        const defaultScale = 55;
        var newSize = size * growing + defaultScale;
        this.setDisplaySize(newSize, newSize);
    }
}