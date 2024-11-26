import { Component, Input } from '@angular/core';
import { Codebox } from '../interface/codebox';

@Component({
  selector: 'codebox-img',
  templateUrl: './codebox-img.component.html',

})

export class CodeboxImgComponent {
 @Input() codebox!: Codebox;
}
