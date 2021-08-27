import { Entity } from "./entity";

export class Player extends Entity{
    score = 0;
    constructor(scene: Phaser.Scene, x: number, y: number){
        super(scene, x, y);
        this.setScale(0.2);
        this.setCircle(95);
        this.setOffset(35,35);
    }
    getRadius(){
        return this.body.radius * this.scale;
    }
}