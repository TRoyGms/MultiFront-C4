import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { TimerService } from '../../../services/timer.service';
import { Codebox } from '../../codebox/interface/codebox';
import { CodeboxService } from '../../codebox/service/codebox.service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponentComponent implements OnInit, OnDestroy {
  @Input() codebox:Codebox | null = null
  x = 170;
  y = 175;
  facingLeft = false;
  playerIMG = 'PJ-SinBG.png';
  playerColor = '';
  private keyDownListener: any;
  codeboxOffsetX = 60; // Offset en el eje X para posicionar el CodeBox
  codeboxOffsetY = 30; 
  terminalid:string | null = null
  codeboxid:string | null = null

  constructor(
    private gameLogic: GameLogicServiceService,
    private timerService: TimerService,
    private codeboxService: CodeboxService
  ) {}

  ngOnInit() {
    // Añadir listener para los eventos de teclado
    this.keyDownListener = window.addEventListener('keydown', (event: KeyboardEvent) => this.move(event));

    // Subscribir a la notificación de Game Over
    this.timerService.timerFinished$.subscribe(() => {
      console.log("Game Over - Temporizador terminado");
      this.gameLogic.setGameOverState(true);
    });
  }

  ngOnDestroy() {
    if (this.keyDownListener) {
      window.removeEventListener('keydown', this.keyDownListener);
    }
  }

  move(event: KeyboardEvent) {
    // Si el juego está en Game Over, no hacer nada
    if (this.gameLogic.isGameOver) {
      console.log("El juego terminó, no puedes mover el personaje");
      return;
    }
  
    const speed = 10;
    let newX = this.x;
    let newY = this.y;
  
    switch (event.key) {
      case 'ArrowUp':
        newY -= speed;
        break;
      case 'ArrowDown':
        newY += speed;
        break;
      case 'ArrowLeft':
        newX -= speed;
        this.facingLeft = true;
        break;
      case 'ArrowRight':
        newX += speed;
        this.facingLeft = false;
        break;
      case ' ': // Tecla Espacio para recoger CodeBox
        // Comprobar si hay un CodeBox cercano y actualizar solo si es diferente
        const newCodeboxId = this.gameLogic.checkCodeBoxNear(newX, newY);
        if (newCodeboxId && newCodeboxId !== this.codeboxid) {
          this.codeboxid = newCodeboxId;
          this.collectCodeBox(this.codeboxid);
          console.log(`Nuevo CodeBox encontrado con ID: ${this.codeboxid}`);
        }
  
        // Comprobar si hay una terminal cercana y actualizar solo si es diferente
        const newTerminalId = this.gameLogic.checkTerminalNear(newX, newY);
        if (newTerminalId && newTerminalId !== this.terminalid) {
          this.terminalid = newTerminalId;
          console.log(`Nueva terminal encontrada con ID: ${this.terminalid}`);
        }
  
        // Verificar si ambos IDs están disponibles
        if (this.codeboxid && this.terminalid) {
          console.log("Ambos IDs disponibles - Terminal:", this.terminalid, "CodeBox:", this.codeboxid);
          this.gameLogic.attachCodeBoxToTerminal(this.codeboxid, this.terminalid);
          this.codebox = null; // El jugador ya no tiene el CodeBox
        }
        
        return;
    }

    this.gameLogic.checkCodeBoxNear(newX,newY)
    this.gameLogic.checkTerminalNear(newX,newY)
  
    // Verificar si no hay colisión con las paredes
    if (!this.gameLogic.checkWallCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }
  
    // Verificar si el jugador necesita cambiar de cámara
    this.gameLogic.checkCameraTransition(this.x, this.y);
  }
  


  collectCodeBox(id: string): void {
    if (this.codebox) {
      // Si el jugador ya tiene un CodeBox, guardarlo en GameLogicService
      this.gameLogic.codeboxes.push(this.codebox);
      console.log('CodeBox actual guardado en GameLogicService:', this.codebox);
  
      // Eliminar el CodeBox del jugador
      this.codebox = null;
    }
  
    // Recoger el nuevo CodeBox
    const newCodebox = this.gameLogic.removeCodeBox(id);
    if (newCodebox) {
      this.codebox = newCodebox; // Asignar el nuevo CodeBox al jugador
      console.log('Nuevo CodeBox recogido:', this.codebox);
    } else {
      console.log('No se pudo recoger el nuevo CodeBox.');
    }
  }
  
  

 
  

}