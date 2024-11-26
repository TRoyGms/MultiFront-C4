import { Component, OnInit, Input, OnDestroy } from '@angular/core'; // Añadido OnDestroy
import { Subscription } from 'rxjs'; // Importar Subscription
import { GameLogicServiceService } from '../../../services/game-logic-service.service'; // Importar el servicio

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal-img.component.html',
})
export class TerminalComponent implements OnInit, OnDestroy {
 
  terminalImg = 'terminal.png'
 
  @Input() terminales!: { 
    _id: string;  
    idnivel: number;
    idpuente: number;
    ladox1: number;
    ladox2: number; 
    ladoy1: number; 
    ladoy2: number; 
    textura: string; 
    codigo: string; 
  }[];
  nearTerminalId: string | null = null;
  nearTerminalMessage: string = '';
  nearTerminalPosition: { x: number, y: number } | null = null;

  private terminalNearSubscription!: Subscription;

  constructor(private gameLogic: GameLogicServiceService) {}

  ngOnInit(): void {
    this.gameLogic.loadTerminal(1);

    this.terminalNearSubscription = this.gameLogic.terminalNear$.subscribe((id) => {
      this.nearTerminalId = id;

      if (id !== null) {
        const terminal = this.terminales.find(term => term._id === id);
        if (terminal) {
          this.nearTerminalMessage = terminal.codigo;
          this.nearTerminalPosition = {
            x: terminal.ladox1,
            y: terminal.ladoy1,
          };
        }
      } else {
        this.nearTerminalMessage = '';
        this.nearTerminalPosition = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.terminalNearSubscription) {
      this.terminalNearSubscription.unsubscribe();
    }
  }
}
