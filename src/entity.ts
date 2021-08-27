export class Entity extends Phaser.Physics.Arcade.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this, 0);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }
    updateSize(size: number){
        const growing = 1.2;
        const defaultScale = 50;
        var newSize = size * growing + defaultScale;
        this.setDisplaySize(newSize, newSize);
    }
}