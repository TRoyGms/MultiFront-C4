import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../../services/bridge.service';

@Component({
  selector: 'bridges-display',
  templateUrl: './bridges-display.component.html',
})
export class BridgesDisplayComponent implements OnInit {
  bridges: any[] = [];

  constructor(private bridgeService: BridgeService) {}

  ngOnInit(): void {
    this.bridgeService.getBridges().subscribe((data) => {
      this.bridges = data;
    });
  }

  // Genera los estilos dinámicamente para el puente
  getBridgeStyles(bridge: any): any {
    return {
      width: `${bridge.ladox1}px`,
      height: `${bridge.ladoy1}px`,
      backgroundColor: bridge.textura,
      border: '2px solid black',
    };
  }
}
