import { Component,Input } from '@angular/core';
import { GameLogicServiceService } from '../service/game-logic-service.service';
@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrl: './game-component.component.css'
})
export class GameComponentComponent {
  constructor(public gameLogic: GameLogicServiceService) {}
  @Input() position!: { x: number; y: number };
}
