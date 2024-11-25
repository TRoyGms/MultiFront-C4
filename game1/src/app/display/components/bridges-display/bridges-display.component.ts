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
      width: `${bridge.ladox1}px`,
      height: `${bridge.ladoy1}px`,
      backgroundColor: bridge.idtextuta || 'gray', // Por si `textura` está vacío.
      border: '2px solid black',
    };
  }
}
