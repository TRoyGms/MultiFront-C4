import { Component, Input } from '@angular/core';
import { Terminal } from '../interface/terminal';

@Component({
  selector: 'app-terminal-obj',
  templateUrl: './terminal-obj.component.html',

})
export class TerminalObjComponent {

  @Input() terminal!: Terminal

}
