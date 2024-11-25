import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeboxImgComponent } from './codebox-img/codebox-img.component';



@NgModule({
  declarations: [
    CodeboxImgComponent,
    ],
  imports: [
    CommonModule
  ],
  exports:[
    CodeboxImgComponent,
  ],
})
export class CodeboxModule { }
