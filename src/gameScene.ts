import { Player } from "./player"
import { Point } from "./point"

export class GameScene extends Phaser.Scene {
    bg?: Phaser.GameObjects.TileSprite
    player?: Player
    point?: Point
    wDown?: number
    newPoint?: Point

    setCameraZoom(camera: Phaser.Cameras.Scene2D.Camera, zoom: number){
        camera.zoom = Math.max(0.4, Math.min(0.8, zoom + 0.005));
    }
}