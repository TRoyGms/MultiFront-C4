import { Component, Input } from '@angular/core';
import { GameLogicServiceService } from '../service/game-logic-service.service';
import { IBridge } from '../Interface/ibridge';

@Component({
  selector: 'app-bridge-component',
  templateUrl: './bridge-component.component.html',
  styleUrls: ['./bridge-component.component.css']
})
export class BridgeComponentComponent {
  @Input() bridge!: IBridge;

  @Input() bridgeEntry!: { x1: number; y1: number; x2: number; y2: number; color: string };
  @Input() bridgeExit!: { x1: number; y1: number; x2: number; y2: number; color: string };

  constructor(private gameLogic: GameLogicServiceService) {
    // Inicializa aquí los puntos de entrada y salida del puente usando la lógica del servicio
    this.bridgeEntry = this.gameLogic.secondCameraComponents.bridge.entry;
    this.bridgeExit = this.gameLogic.secondCameraComponents.bridge.exit;
  }
}
