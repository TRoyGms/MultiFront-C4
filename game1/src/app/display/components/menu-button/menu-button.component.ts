import { Component } from '@angular/core';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',

})
export class MenuButtonComponent {


  toSettings(){
    alert("aqui va a mandar una modal con los ajustes")
  }
}
