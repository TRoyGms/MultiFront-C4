import { Component, Input } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';

@Component({
  selector: 'app-wallcomponent',
  templateUrl: './wallcomponent.component.html',
  styleUrl: './wallcomponent.component.css'
})
export class WallcomponentComponent {
  @Input() walls: { ladox1: number; ladox2: number; ladoy1: number; ladoy2: number; textura: string }[];

  constructor(private gameLogic: GameLogicServiceService) {
    this.walls = this.gameLogic.walls; // Inicializa aquí
  }
  
}
