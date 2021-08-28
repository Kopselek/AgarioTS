import { Player } from "./player"
import { Ball } from "./ball"

export class GameScene extends Phaser.Scene {
    bg: Phaser.GameObjects.TileSprite
    player: Player
    ball: Ball

    setCameraZoom(camera: Phaser.Cameras.Scene2D.Camera, zoom: number){
        camera.zoom = Math.max(1, 0.1, 3 - zoom / 100);
    }
}