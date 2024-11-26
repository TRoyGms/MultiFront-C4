import { Injectable } from '@angular/core';
import { Pared } from '../app/game-module/Interface/pared';
import { Puente } from '../app/game-module/Interface/puente';
import { WallsService } from './walls.service';
import { Codebox } from '../app/codebox/interface/codebox';
import { CodeboxService } from '../app/codebox/service/codebox.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;
  isGameOver = false;
  private codeboxNearSource = new Subject<string | null>();
  codeboxNear$ = this.codeboxNearSource.asObservable(); 
  constructor(private wallService:WallsService,private codeboxService:CodeboxService){}

  bridge: Puente[] = [
    { id:"1", idnivel:1, ladox1: 110, ladox2: 130, ladoy1: 200, ladoy2: 250, idtextuta: 'black' },
    { id:"1", idnivel:1, ladox1: 270, ladox2: 290, ladoy1: 200, ladoy2: 250, idtextuta: 'red' }
  ];

  walls: Pared[] = [];

  loadParedes(): void {
    this.wallService.getWalls().subscribe({
      next: (paredes: Pared[]) => {
        console.log('paredes recibidos:', paredes);
        this.walls = paredes;  // Asignar los codeboxes recibidos al array
      },
      error: (err) => {
        console.error('Error al cargar las paredes:', err);  // Manejo de errores
      }
    });
  }

  codeboxes:Codebox[]=[]

  loadCodebox(nivel:number): void {
    this.codeboxService.getCodeboxesByLevel(nivel).subscribe({
      next: (codeboxes: Codebox[]) => {
        console.log('Codeboxes recibidos:', codeboxes);
        this.codeboxes = codeboxes;  // Asignar los codeboxes recibidos al array
        console.log("aqui",this.codeboxes);
        
      },
      error: (err) => {
        console.error('Error al cargar las codeboxes:', err);  // Manejo de errores
      }
    });
  }

  removeCodeBox(id: string): void { // Cambiado a stringlog
    
    const originalLength = this.codeboxes.length;
    this.codeboxes = this.codeboxes.filter(codebox => codebox._id !== id);
    console.log("codeboxid",this.codeboxes);
    
    if (this.codeboxes.length < originalLength) {
      console.log(`CodeBox con ID ${id} ha sido eliminado.`);
    } else {
      console.log(`No se encontró el CodeBox con ID ${id}.`);
    }
  }

  
  checkCodeBoxNear(x: number, y: number): string | null { // Cambiado a string
    console.log("checar",this.codeboxes);
    
    const codebox = this.codeboxes.find(codebox => (
      x + 35 >= codebox.ladox1 && x < codebox.ladox2 &&
      y + 60 >= codebox.ladoy1 && y < codebox.ladoy2
    ));
    if (codebox) {
      console.log("codebox encontrado",codebox._id);
      this.codeboxNearSource.next(codebox._id);
      return codebox._id;
    } else {
      this.codeboxNearSource.next(null);
      return null;
    }
  }


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
