import { Component } from '@angular/core';
import { TerminalIndicatorStateService } from '../../../../services/terminal-indicator-state.service';

@Component({
  selector: 'activated-terminal-indicator',
  templateUrl: './activated-terminal-indicator.component.html',

})
export class ActivatedTerminalIndicatorComponent {
  constructor(public terminalStateIndicatorService : TerminalIndicatorStateService) {}

}
