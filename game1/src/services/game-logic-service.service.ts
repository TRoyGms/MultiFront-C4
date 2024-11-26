import { Injectable } from '@angular/core';
import { Pared } from '../app/game-module/Interface/pared';
import { Puente } from '../app/game-module/Interface/puente';

@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;
  isGameOver = false;

  bridge: Puente[] = [
    { id:"1", idnivel:1, ladox1: 110, ladox2: 130, ladoy1: 200, ladoy2: 250, idtextuta: 'black' },
    { id:"1", idnivel:1, ladox1: 270, ladox2: 290, ladoy1: 200, ladoy2: 250, idtextuta: 'red' }
  ];

  walls: Pared[] = [
     { ladox1: 0, ladox2: 30, ladoy1: 150, ladoy2: 151, textura: 'black' },
    { ladox1: 30, ladox2: 35, ladoy1: 150, ladoy2: 550, textura: 'black' },
    { ladox1: 1000, ladox2: 1001, ladoy1: 150, ladoy2: 159, textura: 'black' },
    { ladox1: 50, ladox2: 809, ladoy1: 550, ladoy2: 559, textura: 'black' }, 
  ];

  secondCamera = {
    x1: 800,
    x2: 800,
    y1: 300,
    y2: 600,
    zoom: 1,
    angle: 0
  };

  secondCameraComponents = {
    walls: [
      { ladox1: 30, x2: 40, y1: 10, y2: 30, color: 'black' },
      { x1: 40, x2: 50, y1: 10, y2: 30, color: 'black' },
      { x1: 60, x2: 70, y1: 20, y2: 40, color: 'black' },
      { x1: 90, x2: 70, y1: 20, y2: 40, color: 'black' }
    ],
    bridge: {
      entry: { x1: 110, x2: 130, y1: 200, y2: 250, color: 'black' },
      exit: { x1: 270, x2: 290, y1: 200, y2: 250, color: 'red' },
    },
    player: {
      position: { x: 460, y: 300 },
    },
  };

  checkCameraTransition(x: number, y: number) {
    if (this.isAtBridgeEntry(x, y) || this.isAtSecondCameraArea(x, y)) {
      console.log("segunda cámara");
      this.currentCamera = 2;
    } else {
      console.log('primera cámara');
      this.currentCamera = 1;
    }
  }

  checkWallCollision(x: number, y: number): boolean {
    const wallsToCheck  =  this.walls;
    return wallsToCheck.some(walls => (
      x + 35 >= walls.ladox1 && x < walls.ladox2 && y + 60 >= walls.ladoy1 && y < walls.ladoy2
    ));
  }

  private isAtSecondCameraArea(x: number, y: number): boolean {
    return (
      x >= this.secondCamera.x1 && x <= this.secondCamera.x2 &&
      y >= this.secondCamera.y1 && y <= this.secondCamera.y2
    );
  }

  private isAtBridgeEntry(x: number, y: number): boolean {
    return this.bridge.some(bridgeSegment => (
      x > bridgeSegment.ladox1 && x < bridgeSegment.ladox2 &&
      y > bridgeSegment.ladoy1 && y < bridgeSegment.ladoy2
    ));
  }

  private isAtBridgeExit(x: number, y: number): boolean {
    return this.bridge.some(bridgeSegment => (
      x > bridgeSegment.ladox1 && x < bridgeSegment.ladox2 &&
      y > bridgeSegment.ladoy1 && y < bridgeSegment.ladoy2
    ));
  }

  setGameOverState(state: boolean) {
    this.isGameOver = state;  // Cambiar estado a Game Over
    console.log("Estado de juego cambiado a Game Over:", state);  // Verificación en consola
  }
}
