import { Component, Input } from '@angular/core';
import { Puente } from '../../../game-module/Interface/puente';

@Component({
  selector: 'bridges-display',
  templateUrl: './bridges-display.component.html',
})
export class BridgesDisplayComponent {
  @Input() bridges: Puente[] = []; // Ahora recibirá los datos como entrada

  // Genera los estilos dinámicamente para los puentes
  getBridgeStyles(bridge: Puente): any {
    return {
      width: `600px`,
      height: `200px`,
      backgroundImage: `url('/puente.png')`,
      border: '0px solid black',
    };
  }
}
