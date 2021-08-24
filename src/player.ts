export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y, "ball", 0);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setScale(0.2);
    }
    updateSize(size: number){
        const growing = 1.5;
        const defaultScale = 55;
        var newSize = size * growing + defaultScale;
        this.setDisplaySize(newSize, newSize);
    }
}