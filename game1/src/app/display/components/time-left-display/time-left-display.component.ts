import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'time-left-display',
  templateUrl: './time-left-display.component.html',
})
export class TimeLeftDisplayComponent implements OnInit, OnDestroy {
  timeLeft: number = 180; 
  displayMinutes: number = 3;
  displaySeconds: number = 0;
  private timerInterval: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.displayMinutes = Math.floor(this.timeLeft / 60);
        this.displaySeconds = this.timeLeft % 60;
      } else {
        clearInterval(this.timerInterval); 
      }
    }, 1000); 
  }
}
