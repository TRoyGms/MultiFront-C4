import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-exit-modal',
  templateUrl: './confirm-exit-modal.component.html',
})
export class ConfirmExitModalComponent {
  @Output() exitConfirmed = new EventEmitter<boolean>();

  onConfirm() {
    this.exitConfirmed.emit(true); // Emite que el usuario confirmó la salida
  }

  onCancel() {
    this.exitConfirmed.emit(false); // Emite que el usuario canceló
  }
}
