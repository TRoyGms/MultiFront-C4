import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../service/game-logic-service.service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css'] // Cambia "styleUrl" a "styleUrls"
})
export class PlayerComponentComponent implements OnInit {
  @Input() position!: { x: number; y: number };
  x = 50;
  y = 50;
  playerColor = 'blue'; // Color del jugador

  constructor(private gameLogic: GameLogicServiceService) {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.move(event));
  }

  ngOnInit() {
    this.x = this.position.x; // Asigna la posición inicial desde el Input
    this.y = this.position.y;
  }

  move(event: KeyboardEvent) {
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
        break;
      case 'ArrowRight':
        newX += speed;
        break;
    }

    // Verificar si el nuevo movimiento colisionaría con algún muro
    if (!this.gameLogic.checkWallCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    this.gameLogic.checkCameraTransition(this.x, this.y);
  }
}
