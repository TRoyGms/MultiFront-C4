import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvlCardComponent } from './components/lvl-card/lvl-card.component';



@NgModule({
  declarations: [
    LvlCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LvlCardComponent
  ]
})
export class LevelsModule { }
