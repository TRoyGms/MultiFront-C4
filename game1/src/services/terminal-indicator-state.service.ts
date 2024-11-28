import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalIndicatorStateService {

  blinkingRED: boolean = false
  blinkingGREEN: boolean = false
  completed: boolean = false

  constructor() { }

  blinkRed(): void {
    console.log("parpadea rojo")
   
    let blinkCount = 0; 
  
    const interval = setInterval(() => {
      this.blinkingRED = !this.blinkingRED; 
      blinkCount++;
  
      if (blinkCount >= 6) { 
        clearInterval(interval); 
        this.blinkingRED = false; 
      }
    }, 500);
  }

  blinkGreen(): void {
    console.log("Parpadea verde");
    
    let blinkCount = 0; 
  
    const interval = setInterval(() => {
      this.blinkingGREEN = !this.blinkingGREEN; 
      blinkCount++;
  
      if (blinkCount >= 6) { 
        clearInterval(interval); 
        this.blinkingGREEN = false; 
      }
    }, 500); 
  }
  

  setCompleted():void{
    console.log("nivel Terminado")
    this.completed= true
  }
}
