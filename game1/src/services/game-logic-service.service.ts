import { Injectable } from '@angular/core';
import { Pared } from '../app/game-module/Interface/pared';
import { Puente } from '../app/game-module/Interface/puente';
import { WallsService } from './walls.service';
import { Codebox } from '../app/codebox/interface/codebox';
import { CodeboxService } from '../app/codebox/service/codebox.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Terminal } from '../app/terminal/interface/terminal';
import { TerminalService } from './terminal.service';
import { BridgeService } from './bridge.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {

  exit ={ladox1:1100,ladox2:1200,ladoy1:250,ladoy2:350,image:"exit.png"}
  private estadoSubject = new BehaviorSubject<boolean>(false); // Estado inicial es false
  estado$ = this.estadoSubject.asObservable(); // Observable para que los componentes se suscriban
  private estadoVideo = new BehaviorSubject<boolean>(false); // Estado inicial es false
  estadoVID$ = this.estadoVideo.asObservable(); // Observable para que los componentes se suscriban



  currentCamera = 1;
  isGameOver = false;

  private codeboxNearSource = new Subject<string | null>();
  codeboxNear$ = this.codeboxNearSource.asObservable(); 
  
  private terminalNearSource = new Subject<string | null>();
  terminalNear$ = this.terminalNearSource.asObservable();  // Observable to notify about terminals nearby

  constructor(
    private wallService: WallsService,
    private codeboxService: CodeboxService,
    private terminalService: TerminalService ,
    private bridgeService:BridgeService // Inject the terminal service
  ) {}

  terminalesTotales: number = 0
  bridge: Puente[] = [];
  bridgeAux:Puente[]=[]

  walls: Pared[] = [];
  codeboxes: Codebox[] = [];
  terminales: Terminal[] = []; 
  removedCodebox: Codebox | null = null;
  codeboxesDup:Codebox[] = []


  // Load walls data from the WallService
  loadParedes(): void {
    this.wallService.getWalls().subscribe({
      next: (paredes: Pared[]) => {
        console.log('paredes recibidos:', paredes);
        this.walls = paredes;
      },
      error: (err) => {
        console.error('Error al cargar las paredes:', err);
      }
    });
  }

  loadPuente(): void {
    console.log("Cargando puentes...");
    this.bridgeService.getBridgesByLvl().subscribe({
      next: (puentes: Puente[]) => {
        console.log('Puentes recibidos:', puentes);
        this.bridgeAux = puentes;
      },
      error: (err) => {
        console.error('Error al cargar los puentes:', err);
      }
    });
  }
  
  loadCodebox(nivel: number): void {
    this.codeboxService.getCodeboxesByLevel(nivel).subscribe({
      next: (codeboxes: Codebox[]) => {
        console.log('Codeboxes recibidos:', codeboxes);
       
        this.codeboxes = codeboxes; 
        this.codeboxesDup = [...codeboxes]; 
      },
      error: (err) => {
        console.error('Error al cargar las codeboxes:', err);
      }
    });
  }
  
  loadTerminal(nivel: number): void {
    this.terminalService.getTerminalsByLvl(nivel).subscribe({
      next: (terminals: Terminal[]) => {
        console.log('Terminales cargadas:', terminals);
        this.terminales = terminals;
        this.terminalesTotales = this.terminales.length
        sessionStorage.setItem("terminalesTotales", this.terminalesTotales.toString())
      },
      error: (err) => {
        console.error('Error al cargar terminales:', err);
      }
    });
  }
  

  // Check proximity to codeboxes
  checkCodeBoxNear(x: number, y: number): string | null {
    //console.log("checar codeboxes", this.codeboxes);
    const codebox = this.codeboxes.find(codebox => (
      x + 70 >= codebox.ladox1 && x < codebox.ladox2 &&
      y + 110 >= codebox.ladoy1 && y < codebox.ladoy2
    ));
    if (codebox) {
      //console.log("Codebox encontrado", codebox._id);
      this.codeboxNearSource.next(codebox._id);
      return codebox._id;
    } else {
      this.codeboxNearSource.next(null);
      return null;
    }
  }

  // Check proximity to terminals
  checkTerminalNear(x: number, y: number): string | null {
    //console.log("checar terminales", this.terminales);
    const terminal = this.terminales.find(terminal => (
      x +70 >= terminal.ladox1 && x < terminal.ladox2 &&
      y + 110 >= terminal.ladoy1 && y < terminal.ladoy2
    ));
    if (terminal) {
     // console.log("Terminal encontrado", terminal._id);
      this.terminalNearSource.next(terminal._id);  // Notify about the terminal being near
      return terminal._id;
    } else {
      this.terminalNearSource.next(null);
      return null;
    }
  }

  setTrue() {
    this.estadoSubject.next(true); // Emite un valor nuevo para 'estado'
    console.log('Estado actualizado a true');
  }

  setFalse() {
    this.estadoSubject.next(false); // Emite un valor nuevo para 'estado'
    console.log('Estado actualizado a false');
  }


  checkExitNear(x: number, y: number): string | null {
    if (this.estadoSubject) {
      const exit = this.exit; // Asegúrate de que 'this.exit' es un objeto, no un arreglo
    if (
        x + 70 >= exit.ladox1 && x < exit.ladox2 &&
        y + 110 >= exit.ladoy1 && y < exit.ladoy2
    ) {
        console.log("Salida encontrada");
        this.estadoVideo.next(true);  // Emitimos true cuando estamos cerca de la salida

        return "exit"; // Devuelve un identificador si lo necesitas
    } else {
      this.estadoVideo.next(false);  // Emitimos false cuando no estamos cerca
        return null;
        
    }
    }else{
      return null
    }
    
}


checkExitNdear(x: number, y: number): string | null {
  if (
    x + 70 >= this.exit.ladox1 && x < this.exit.ladox2 &&
    y + 110 >= this.exit.ladoy1 && y < this.exit.ladoy2
  ) {
    this.estadoVideo.next(true);  // Emitimos true cuando estamos cerca de la salida
    return "exit"; 
  } else {
    this.estadoVideo.next(false);  // Emitimos false cuando no estamos cerca
    return null;
  }
}




  removeCodeBox(id: string): Codebox | null {
    const codeboxIndex = this.codeboxes.findIndex(codebox => codebox._id === id);
    if (codeboxIndex !== -1){
      const removedCodebox = this.codeboxes.splice(codeboxIndex, 1)[0]; // Extrae y elimina el CodeBox
      //console.log(`CodeBox con ID ${id} ha sido eliminado.`);
      return removedCodebox;
    } else {
      //console.log(`No se encontró el CodeBox con ID ${id}.`);
      return null;
    }
  }
  

  // Remove a terminal by ID
  removeTerminal(id: string): void {
    const originalLength = this.terminales.length;
    this.terminales = this.terminales.filter(terminal => terminal._id !== id);
    console.log("terminales", this.terminales);

    if (this.terminales.length < originalLength) {
      console.log(`Terminal con ID ${id} ha sido eliminado.`);
    } else {
      console.log(`No se encontró el Terminal con ID ${id}.`);
    }
  }

  async attachCodeBoxToTerminal(codeboxId: string, terminalId: string): Promise<boolean> {
    const terminal = this.terminales.find(t => t._id === terminalId);
    const codebox = this.codeboxesDup.find(cb => cb._id === codeboxId);
  
    if (terminal && codebox) {
      if (terminal.codebox) {
        console.warn(`La terminal ${terminalId} ya tiene un CodeBox asignado.`);
        return false;  // Rechazado si ya tiene un CodeBox
      }
  
      try {
        const result = await this.terminalService.buscar(terminalId, codeboxId).toPromise();
        console.log(result);
        console.log("terminal",terminal);
        const bridge = this.bridgeAux.find(b=>b._id === terminal.idpuente)
        console.log("puente encontrado",bridge);
        if (bridge) {
          this.bridge.push(bridge)
          console.log("puente pusheado");
        }else{
          console.log("puente no encontrado o pusheado");
          
        }
        
        
        if (result) {
          // Si la API valida correctamente
          terminal.codebox = { ...codebox };
          console.log(`CodeBox ${codeboxId} asignado correctamente a Terminal ${terminalId}`);
          return true;  // Asignación exitosa
        } else {
          console.warn(`El CodeBox ${codeboxId} no es válido para la Terminal ${terminalId}`);
          return false;  // Rechazado por validación
        }
      } catch (error) {
        console.error(`Error al conectar con la API: ${error}`);
        return false;  // En caso de error, no se puede asignar
      }
    } else {
      console.error('No se encontraron la Terminal o el CodeBox para vincular.');
      return false;  // Error, no se encontró terminal o codebox
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
    const wallsToCheck = this.walls;
    return wallsToCheck.some(walls => (
      x +50 >= walls.ladox1 && x+20 < walls.ladox2 && y+90 >= walls.ladoy1 && y +20< walls.ladoy2
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
    this.isGameOver = state;
    console.log("Estado de juego cambiado a Game Over:", state);
  }
}
