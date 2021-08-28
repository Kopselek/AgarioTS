import { Entity } from "./entity";

export class Ball extends Entity{
    constructor(scene: Phaser.Scene, x: number, y: number, vector?: Phaser.Math.Vector2){
        super(scene, x, y);
        this.tint = Math.random() * 0xffffff;
        this.setScale(0.05);
        this.setCircle(80);
        this.setOffset(50,50);
        if(vector){ this.moveTo(vector, 5, 200) }
    }

    public moveTo(vec: Phaser.Math.Vector2, speed: number, time: number){
        this.scene.physics.moveTo(this, vec.x, vec.y, speed, time);
    }
}