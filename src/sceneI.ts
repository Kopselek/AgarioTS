import { Player } from "./player"
import { Point } from "./point"

export class IndexScene extends Phaser.Scene {
    bg?: Phaser.GameObjects.TileSprite
    player?: Player
    point?: Point
    wDown?: number
    newPoint?: Point
}