import { Component, OnInit, Input } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service'; // Importar el servicio
import { Terminal } from '../interface/terminal'; // Ajusta la ruta según corresponda

@Component({
  selector: 'app-terminal',
   templateUrl: './terminal-img.component.html',
})

export class TerminalComponent implements OnInit {
  @Input() terminales: Terminal[] = [];  // Declaramos la propiedad 'terminales' como Input
  nearTerminalId: string | null = null;  // ID del terminal cercano
  nearTerminalPosition: { x: number, y: number } | null = null;  // Posición del terminal cercano
  nearTerminalMessage: string = '';  // Mensaje de proximidad al terminal
  terminalImg = '/terminal.png';  // Ruta de la imagen del terminal

  constructor(private gameLogicService: GameLogicServiceService) {}

  ngOnInit(): void {
    // Cargar los terminales para el nivel actual, asumiendo nivel 1 por ahora
    this.gameLogicService.loadTerminal(1);

    // Suscripción al Subject de proximidad a terminal
    this.gameLogicService.terminalNear$.subscribe((terminalId: string | null) => {
      if (terminalId) {
        this.nearTerminalId = terminalId;
        // Aquí puedes buscar el terminal correspondiente para obtener su posición y mensaje
        const terminal = this.terminales.find(t => t.id === terminalId);
        if (terminal) {
          this.nearTerminalPosition = { x: terminal.ladox1, y: terminal.ladoy1 };
          this.nearTerminalMessage = '¡Estás cerca de un terminal! Haz clic para interactuar.';
        }
      } else {
        this.nearTerminalId = null;
        this.nearTerminalPosition = null;
        this.nearTerminalMessage = '';
      }
    });
  }

  // Método para activar el terminal (puedes personalizarlo según la lógica de activación)
  activate(): void {
    if (this.nearTerminalId) {
      console.log('Activando terminal con ID:', this.nearTerminalId);
      // Lógica para activar el terminal, como mostrar un mensaje o cambiar el estado
    }
  }

  // Método para verificar la proximidad del jugador a los terminales
  checkProximity(x: number, y: number): void {
    const terminalId = this.gameLogicService.checkTerminalNear(x, y);
    // La lógica para manejar la proximidad del jugador a los terminales ya está en el servicio
    // Solo nos suscribimos a la notificación
  }
}
