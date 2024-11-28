import { Injectable } from '@angular/core';
import { Pared } from '../app/game-module/Interface/pared';
import { Puente } from '../app/game-module/Interface/puente';
import { WallsService } from './walls.service';
import { Codebox } from '../app/codebox/interface/codebox';
import { CodeboxService } from '../app/codebox/service/codebox.service';
import { Subject } from 'rxjs';
import { Terminal } from '../app/terminal/interface/terminal';
import { TerminalService } from './terminal.service';

@Injectable({
  providedIn: 'root'
})
export class GameLogicServiceService {
  currentCamera = 1;
  isGameOver = false;

  private codeboxNearSource = new Subject<string | null>();
  codeboxNear$ = this.codeboxNearSource.asObservable(); 
  
  private terminalNearSource = new Subject<string | null>();
  terminalNear$ = this.terminalNearSource.asObservable();  // Observable to notify about terminals nearby

  constructor(
    private wallService: WallsService,
    private codeboxService: CodeboxService,
    private terminalService: TerminalService  // Inject the terminal service
  ) {}

  bridge: Puente[] = [
    { id: "1", idnivel: 1, ladox1: 110, ladox2: 130, ladoy1: 200, ladoy2: 250, idtextuta: 'black' },
    { id: "1", idnivel: 1, ladox1: 270, ladox2: 290, ladoy1: 200, ladoy2: 250, idtextuta: 'red' }
  ];

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

  // Load codeboxes for the given level
  loadCodebox(nivel: number): void {
    this.codeboxService.getCodeboxesByLevel(nivel).subscribe({
      next: (codeboxes: Codebox[]) => {
        console.log('Codeboxes recibidos:', codeboxes);
        // Almacenar las codeboxes en una variable auxiliar
        this.codeboxes = codeboxes; // Esta sigue siendo la variable que usas
        this.codeboxesDup = [...codeboxes]; // Almacenar una copia inmutable
      },
      error: (err) => {
        console.error('Error al cargar las codeboxes:', err);
      }
    });
  }
  

  // Load terminals for the given level
  loadTerminal(nivel: number): void {
    this.terminalService.getTerminalsByLvl(nivel).subscribe({
      next: (terminals: Terminal[]) => {
        console.log('Terminales cargadas:', terminals);
        this.terminales = terminals;
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
