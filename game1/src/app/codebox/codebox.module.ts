import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeboxComponent } from './codebox/codebox.component';



@NgModule({
  declarations: [
    CodeboxComponent,
    ],
  imports: [
    CommonModule
  ],
  exports:[
    CodeboxComponent,
  ],
})
export class CodeboxModule { }
