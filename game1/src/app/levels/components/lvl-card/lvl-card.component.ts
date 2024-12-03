import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from '../../interface/level';
import { Router } from '@angular/router';

@Component({
  selector: 'lvl-card',
  templateUrl: './lvl-card.component.html',

})
export class LvlCardComponent {
  @Input() level!: Level
  @Output() selectedLvl = new EventEmitter<number>()

  constructor( private router:Router ){
  
  }

  toLvl():void {
    const nivel = this.level.idnivel.toString()
    localStorage.setItem("idnivel", nivel)
    this.router.navigate(['game'])
    //this.selectedLvl.emit(this.level.idnivel)
  }

}
