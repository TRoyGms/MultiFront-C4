import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../../../levels/interface/level';

@Component({
  selector: 'lvl-selector',
  templateUrl: './lvl-selector.component.html',

})
export class LvlSelectorComponent {
  private levels: Level [] = []

  constructor(private router: Router){

  }

  logOff():void{
    //borrar datos del usuario de localstorage
    this.router.navigate(["register"])
  }

  toSettings():void{
    
  }

  
}
