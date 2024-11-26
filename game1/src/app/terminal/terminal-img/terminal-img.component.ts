import { Component, Input } from '@angular/core';
import { Terminal } from '../../terminal/interface/terminal';

@Component({
  selector: 'terminal-img',
  templateUrl: './terminal-img.component.html',
})

export class TerminalImgComponent {
  terminalImg = 'terminal.png'
  @Input() terminal!: Terminal;
}
