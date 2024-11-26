import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal-img/terminal-img.component';


@NgModule({
  declarations: [
    TerminalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TerminalComponent,
  ]
})
export class TerminalModule { }
