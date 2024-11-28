import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { Puente } from '../Interface/puente';

@Component({
  selector: 'app-bridge-component',
  templateUrl: './bridge-component.component.html',
  styleUrl: './bridge-component.component.css'
})
export class BridgeComponentComponent implements OnInit {
  @Input() bridge:Puente[]=[];

  constructor(private gameLogic: GameLogicServiceService) {
  }

  ngOnInit(): void {
    console.log("llamando aqui");
      this.gameLogic.loadPuente();
  }



}
