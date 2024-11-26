import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { TimerService } from '../../../services/timer.service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css']
})
export class PlayerComponentComponent implements OnInit, OnDestroy {
  x = 170;
  y = 175;
  facingLeft = false;
  playerIMG = 'PJ-SinBG.png';
  playerColor = '';
  private keyDownListener: any;

  constructor(
    private gameLogic: GameLogicServiceService,
    private timerService: TimerService
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
        const codebox = this.gameLogic.checkCodeBoxNear(newX, newY);
        if (codebox !== null) { // Verifica que no sea null
            console.log(`CodeBox encontrado con ID: ${codebox}`);
            this.collectCodeBox(codebox);
        } else {
            console.log('No hay CodeBox cercano para recoger.');
        }
        return;
    
    }

    this.gameLogic.checkCodeBoxNear(newX,newY)

    // Verificar si no hay colisión con las paredes
    if (!this.gameLogic.checkWallCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    // Verificar si el jugador necesita cambiar de cámara
    this.gameLogic.checkCameraTransition(this.x, this.y);
  }


  collectCodeBox(id: string): void { // Cambiado a string
    this.gameLogic.removeCodeBox(id);
  }
  


  

}