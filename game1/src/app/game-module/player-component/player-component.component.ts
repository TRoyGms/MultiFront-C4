import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../service/game-logic-service.service';

@Component({
  selector: 'app-player-component',
  templateUrl: './player-component.component.html',
  styleUrls: ['./player-component.component.css'] // Cambia "styleUrl" a "styleUrls"
})

export class PlayerComponentComponent implements OnInit {
  @Input() position!: { x: number; y: number };
  x = 120;
  y = 115;
  facingLeft = false; // Indica si el personaje está mirando a la izquierda
  playerColor = '';
  playerIMG = 'https://cdn.discordapp.com/attachments/1250621563074646130/1303930968578723874/PJ-SinBG.png?ex=672d8bd8&is=672c3a58&hm=7400e2852a922b5d09310f027235745b2e8575bdb8701de40e9151f5362c436c&';

  constructor(private gameLogic: GameLogicServiceService) {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.move(event));
  }

  ngOnInit() {
    this.x = this.position.x;
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
        this.facingLeft = true; // Mirar a la izquierda
        break;
      case 'ArrowRight':
        newX += speed;
        this.facingLeft = false; // Mirar a la derecha
        break;
    }

    if (!this.gameLogic.checkWallCollision(newX, newY)) {
      this.x = newX;
      this.y = newY;
    }

    this.gameLogic.checkCameraTransition(this.x, this.y);
  }
}
