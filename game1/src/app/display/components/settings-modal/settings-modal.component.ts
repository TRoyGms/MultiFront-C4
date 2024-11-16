import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'settings-modal',
  templateUrl: './settings-modal.component.html',
})
export class SettingsModalComponent {
  @Output() closeSettings = new EventEmitter<void>();

  closeSettingsModal() {
    this.closeSettings.emit();
  }
}
