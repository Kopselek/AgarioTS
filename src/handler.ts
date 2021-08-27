import { GameScene } from "./gameScene";

export function updateHandler(scene: GameScene){
    scene.events.emit('updateScore', scene.player.score);
    scene.setCameraZoom(scene.cameras.main, scene.player.score);
}