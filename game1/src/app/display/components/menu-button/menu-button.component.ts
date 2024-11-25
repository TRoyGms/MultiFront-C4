import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from '../../../../services/timer.service';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  isModalOpen = false;
  isSettingsOpen = false;
  isExitConfirmOpen = false; // Nueva propiedad para abrir el modal de confirmación

  constructor(private router: Router, private timerService: TimerService) {}

  openModal() {
    this.isModalOpen = true;
    this.timerService.pauseTimer(); // Pausar el temporizador
  }

  closeModal() {
    this.isModalOpen = false;
    this.timerService.resumeTimer(); // Reanudar el temporizador
  }

  openSettings() {
    this.isSettingsOpen = true;
    this.closeModal(); // Cierra el menú al abrir los ajustes
    this.timerService.pauseTimer(); // Pausar el temporizador
  }

  closeSettings() {
    this.isSettingsOpen = false;
    this.timerService.resumeTimer();
  }

  // Método de salida con confirmación
  onExit() {
    this.isExitConfirmOpen = true; // Abre el modal de confirmación
    this.closeModal(); // Cierra el menú antes de mostrar la confirmación
    this.timerService.pauseTimer();
  }

  onExitConfirmed(isConfirmed: boolean) {
    if (isConfirmed) {
      this.router.navigate(['/select_lvl']); // Redirige a la ruta /select_lvl
    }
    this.isExitConfirmOpen = false; // Cierra el modal de confirmación
    this.timerService.resumeTimer();
  }
}
