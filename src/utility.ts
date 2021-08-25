export function setCameraZoom(camera: Phaser.Cameras.Scene2D.Camera, zoom: number){
    if(camera.zoom > 0.4){
        if(camera.zoom < 0.7){
            camera.zoom = zoom + 0.005;
        }else{
            camera.zoom = zoom;
        }
    }
}