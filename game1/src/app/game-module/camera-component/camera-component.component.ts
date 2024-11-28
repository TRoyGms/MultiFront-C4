import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-camera-component',
  templateUrl: './camera-component.component.html',
  styleUrls: ['./camera-component.component.css']
})
export class CameraComponentComponent {
  @Input() isActive = false;
  @Input() player!: { position: { x: number; y: number } };

  movePlayer(x: number, y: number) {
    if (this.player) { // Asegúrate de que player no sea undefined
      this.player.position.x = x;
      this.player.position.y = y;

      // Comprobar la transición de cámara
     // this.checkCameraTransition(x, y);
    }
  }
/* 
  checkCameraTransition(x: number, y: number) {
    // Lógica para comprobar la transición de cámara
    // Aquí deberías definir cómo reaccionar cuando el jugador se mueve
  } */
}
