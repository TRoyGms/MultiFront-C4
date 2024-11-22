import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from '../../interface/level';

@Component({
  selector: 'lvl-card',
  templateUrl: './lvl-card.component.html',

})
export class LvlCardComponent {
  @Input() level!: Level
  @Output() selectedLvl = new EventEmitter<number>()

  constructor(){

  }

  toLvl():void {
    this.selectedLvl.emit(this.level.idnivel)
  }

}
