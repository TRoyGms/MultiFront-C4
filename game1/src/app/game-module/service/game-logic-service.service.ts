import { Injectable } from '@angular/core';
import { IWall } from '../Interface/iwall';
import { IBridge } from '../Interface/ibridge';

@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;

  // Definir los puntos de destino del puente
  bridge: IBridge[] = [
    { x1: 110, x2: 130, y1: 200, y2: 250, color: 'black' },
    { x1: 270, x2: 290, y1: 200, y2: 250, color: 'red' }
  ];

  // Definir un arreglo de muros para la primera cámara
  walls: IWall[] = [
    { x1: 1, x2: 40, y1: 1, y2: 1000, color: 'yellow' }, // Primer muro
    { x1: 450, x2: 550, y1: 100, y2: 300, color: 'green' },  // Segundo muro
    { x1: 600, x2: 700, y1: 200, y2: 400, color: 'blue' },   // Tercer muro
  ];

  // Definir la segunda cámara
  secondCamera = {
    x1: 800,
    x2: 800,
    y1: 300,
    y2: 600,
    zoom: 1,
    angle: 0
  };

  // Componentes de la segunda cámara
  secondCameraComponents = {
    walls: [
      { x1: 30, x2: 40, y1: 10, y2: 30, color: 'black' },
      { x1: 40, x2: 50, y1: 10, y2: 30, color: 'black' },
      { x1: 60, x2: 70, y1: 20, y2: 40, color: 'black' },
    ],
    bridge: {
      entry: { x1: 110, x2: 130, y1: 200, y2: 250, color: 'black' },
      exit: { x1: 270, x2: 290, y1: 200, y2: 250, color: 'red' },
    },
    player: {
      position: { x: 440, y: 300 },
    },
  };

  checkCameraTransition(x: number, y: number) {
    if (this.isAtBridgeEntry(x, y) || this.isAtSecondCameraArea(x, y)) {
      console.log("segunda cámara");
      this.currentCamera = 2;  // Cambia a la segunda cámara
    } else {
      console.log('primera cámara');
      this.currentCamera = 1;  // Vuelve a la primera cámara
    }
  }

  // Verificar si el jugador está en el área de cualquiera de los muros
  checkWallCollision(x: number, y: number): boolean {
    const wallsToCheck = this.currentCamera === 1 ? this.walls : this.secondCameraComponents.walls;
    const playerHitboxSize = 10; // Tamaño de la hitbox del jugador

    return wallsToCheck.some(wall => {
      const wallWidth = wall.x2 - wall.x1;
      const wallHeight = wall.y2 - wall.y1;

      return (
        x + playerHitboxSize >= wall.x1 && x <= wall.x1 + wallWidth &&
        y + playerHitboxSize >= wall.y1 && y <= wall.y1 + wallHeight
      );
    });
  }

  // Verifica si el jugador está en el área de la segunda cámara
  private isAtSecondCameraArea(x: number, y: number): boolean {
    return (
      x >= this.secondCamera.x1 && x <= this.secondCamera.x2 &&
      y >= this.secondCamera.y1 && y <= this.secondCamera.y2
    );
  }

  // Funciones para verificar si el jugador está en el punto de entrada o salida del puente
  private isAtBridgeEntry(x: number, y: number): boolean {
    return this.bridge.some(bridgeSegment => (
      x > bridgeSegment.x1 && x < bridgeSegment.x2 &&
      y > bridgeSegment.y1 && y < bridgeSegment.y2
    ));
  }

  private isAtBridgeExit(x: number, y: number): boolean {
    return this.bridge.some(bridgeSegment => (
      x > bridgeSegment.x1 && x < bridgeSegment.x2 &&
      y > bridgeSegment.y1 && y < bridgeSegment.y2
    ));
  }
}
