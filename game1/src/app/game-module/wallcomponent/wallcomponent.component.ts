import { Component, Input } from '@angular/core';
import { GameLogicServiceService } from '../service/game-logic-service.service';

@Component({
  selector: 'app-wallcomponent',
  templateUrl: './wallcomponent.component.html',
  styleUrl: './wallcomponent.component.css'
})
export class WallcomponentComponent {
  @Input() walls: { x1: number; x2: number; y1: number; y2: number; color: string }[];

  constructor(private gameLogic: GameLogicServiceService) {
    this.walls = this.gameLogic.walls; // Inicializa aquí
  }
  
}
