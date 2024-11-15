import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lvl-selector',
  templateUrl: './lvl-selector.component.html',

})
export class LvlSelectorComponent {

  constructor(private router: Router){

  }

  logOff():void{

    this.router.navigate(["register"])

  }

  toSettings():void{
    
  }

  
}
