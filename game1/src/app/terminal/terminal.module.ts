import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalImgComponent } from './terminal-img/terminal-img.component';


@NgModule({
  declarations: [
    TerminalImgComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TerminalImgComponent,
  ]
})
export class TerminalModule { }
