import { Component, OnInit, Input, OnDestroy } from '@angular/core'; 
import { Subscription } from 'rxjs'; 
import { GameLogicServiceService } from '../../../services/game-logic-service.service'; 
import { Codebox } from '../../codebox/interface/codebox';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal-img.component.html',
})
export class TerminalComponent implements OnInit, OnDestroy {
  private idnivel:number = 0

  @Input() codebox: Codebox | null = null; // Recibe el codebox desde el componente padre
  codeboxOffsetX = 60; // Desplazamiento en el eje X para posicionar el CodeBox
  codeboxOffsetY = 30; 
  terminalImg = 'terminal.png';

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
  }[];  // Lista de terminales
  nearTerminalId: string | null = null;
  nearTerminalMessage: string = '';
  nearTerminalPosition: { x: number, y: number } | null = null;

  private terminalNearSubscription!: Subscription;

  constructor(public gameLogic: GameLogicServiceService) {}

  ngOnInit(): void {
    this.idnivel= parseInt(localStorage.getItem('idnivel') || '0', 10)
    this.gameLogic.loadTerminal(this.idnivel); // Cargar la terminal 1 al inicio

    // Subscribirse a la lógica para mostrar el código y la terminal cercana
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
      this.terminalNearSubscription.unsubscribe(); // Limpiar suscripción
    }
  }
}
