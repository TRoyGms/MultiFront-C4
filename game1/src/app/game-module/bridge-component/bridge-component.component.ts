import { Component, Input } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { Puente } from '../Interface/puente';

@Component({
  selector: 'app-bridge-component',
  templateUrl: './bridge-component.component.html',
  styleUrls: ['./bridge-component.component.css']
})
export class BridgeComponentComponent {
  @Input() bridge!: Puente;

  @Input() bridgeEntry!: { x1: number; y1: number; x2: number; y2: number; color: string };
  @Input() bridgeExit!: { x1: number; y1: number; x2: number; y2: number; color: string };

  constructor(private gameLogic: GameLogicServiceService) {

    //this.bridgeEntry = this.gameLogic.secondCameraComponents.bridge.entry;
    //this.bridgeExit = this.gameLogic.secondCameraComponents.bridge.exit;
  }
}
