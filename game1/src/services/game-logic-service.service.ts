import { Injectable } from '@angular/core';
import { Pared } from '../app/game-module/Interface/pared';
import { Puente } from '../app/game-module/Interface/puente';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;
  isGameOver = false;
  private codeboxNearSource = new Subject<number | null>();
  codeboxNear$ = this.codeboxNearSource.asObservable(); 

  bridge: Puente[] = [
    { ladox1: 110, ladox2: 130, ladoy1: 200, ladoy2: 250, idtextuta: 'black' },
    { ladox1: 270, ladox2: 290, ladoy1: 200, ladoy2: 250, idtextuta: 'red' }
  ];

  walls: Pared[] = [
    { ladox1: 50, ladox2: 59, ladoy1: 150, ladoy2: 550, textura: 'black' },
    { ladox1: 800, ladox2: 809, ladoy1: 150, ladoy2: 550, textura: 'black' },
    { ladox1: 50, ladox2: 809, ladoy1: 150, ladoy2: 159, textura: 'black' },
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
  codeBoxes = [
    {
      id: 1,  // Agregar el ID
      idnivel: 1,  // Agregar el idnivel
      idpuente: 1,  // Agregar el idpuente
      ladox1: 350,  // Definir las dimensiones
      ladoy1: 450,
      ladox2: 400,  // Posición
      ladoy2: 500,
      textura: 'blue',  // Color o textura
      codigo: 'someCode'  // Código (si es necesario)
    },
    {
      id: 2,
      idnivel: 2,
      idpuente: 102,
      ladox1: 550,
      ladoy1:350,
      ladox2: 600,
      ladoy2: 400,
      textura: 'green',
      codigo: 'anotherCode'
    },
    {
      id: 3,
      idnivel: 2,
      idpuente: 102,
      ladox1: 250,
      ladoy1:350,
      ladox2: 300,
      ladoy2: 400,
      textura: 'red',
      codigo: 'anotherCode'
    },
    {
      id: 4,
      idnivel: 2,
      idpuente: 102,
      ladox1: 550,
      ladoy1:250,
      ladox2: 600,
      ladoy2: 300,
      textura: 'yellow',
      codigo: 'anotherCode'
    },
    {
      id: 5,
      idnivel: 2,
      idpuente: 102,
      ladox1: 350,
      ladoy1:150,
      ladox2: 400,
      ladoy2: 200,
      textura: 'black',
      codigo: 'anotherCode'
    }
  ];

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

  removeCodeBox(id: number) {
    const originalLength = this.codeBoxes.length;
    // Filtra el array de codeBoxes, excluyendo el que tenga el id que coincide
    this.codeBoxes = this.codeBoxes.filter(codebox => codebox.id !== id);

    if (this.codeBoxes.length < originalLength) {
        console.log(`CodeBox con ID ${id} ha sido eliminado.`);
    } else {
        console.log(`No se encontró el CodeBox con ID ${id}.`);
    }
}


checkCodeBoxNear(x: number, y: number): number | null {
  const codeboxToCheck = this.codeBoxes; // Array de CodeBoxes
  const codebox = codeboxToCheck.find(codebox => (
    x + 35 >= codebox.ladox1 && x < codebox.ladox2 &&
    y + 60 >= codebox.ladoy1 && y < codebox.ladoy2
  ));

  if (codebox) {
      console.log(`ID del CodeBox cercano: ${codebox.id}`);
      this.codeboxNearSource.next(codebox.id); // Emitir el ID del CodeBox cercano
      return codebox.id; // Retornar el ID del CodeBox encontrado
  } else {
      console.log('No hay CodeBox cercano.');
      this.codeboxNearSource.next(null); // Emitir null si no hay CodeBox cercano
      return null; // No se encontró ningún CodeBox
  }
}






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
