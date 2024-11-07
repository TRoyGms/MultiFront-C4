import { Injectable } from '@angular/core';
import { Pared } from '../Interface/pared';
import { Puente } from '../Interface/puente';

@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;

  // Definir los puntos de destino del puente
  bridge: Puente[] = [
    { ladox1: 110, ladox2: 130, ladoy1: 200, ladoy2: 250, idtextuta: 'black' },
    { ladox1: 270, ladox2: 290, ladoy1: 200, ladoy2: 250, idtextuta: 'red' }
  ];

  // Definir un arreglo de muros para la primera cámara

  walls: Pared[] = [
    { ladox1: 100, ladox2: 109, ladoy1: 100, ladoy2: 500, textura: 'black' },    // Primer muro verticual
    { ladox1: 891, ladox2: 900, ladoy1: 100, ladoy2: 500, textura: 'black' },    // Segundo muro vertical
    { ladox1: 100, ladox2: 900, ladoy1: 100, ladoy2: 109, textura: 'black' },  // Primer muro horizontal
    { ladox1: 100, ladox2: 900, ladoy1: 500, ladoy2: 509, textura: 'black' },   // Segundo muro Horizontal
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

      { ladox1: 30, x2: 40, y1: 10, y2: 30, color: 'black' },  // Primer muro
      { x1: 40, x2: 50, y1: 10, y2: 30, color: 'black' },   // Segundo muro
      { x1: 60, x2: 70, y1: 20, y2: 40, color: 'black' },    // Tercer muro
      { x1: 90, x2: 70, y1: 20, y2: 40, color: 'black' }   //cuarta pared
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

    const wallsToCheck  =  this.walls; 
    return wallsToCheck.some(walls => (
      x +20 >= walls.ladox1 && x < walls.ladox2 && y + 20 >= walls.ladoy1 && y < walls.ladoy2
    ));
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
}
