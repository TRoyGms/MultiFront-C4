import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timeLeft = 330; //(5 minutos 30 segundos)
  private displayMinutes = Math.floor(this.timeLeft / 60);
  private displaySeconds = this.timeLeft % 60;
  
  private timeLeftSubject = new BehaviorSubject<{ minutes: number; seconds: number }>({
    minutes: this.displayMinutes,
    seconds: this.displaySeconds,
  });
  timeLeft$ = this.timeLeftSubject.asObservable();

  private isPaused = false;
  private timerInterval: any;

  constructor() {}

  startTimer() {
    if (this.timerInterval) return;

    this.timerInterval = setInterval(() => {
      if (!this.isPaused && this.timeLeft > 0) {
        this.timeLeft--;
        this.displayMinutes = Math.floor(this.timeLeft / 60);
        this.displaySeconds = this.timeLeft % 60;
        this.timeLeftSubject.next({ minutes: this.displayMinutes, seconds: this.displaySeconds });
      } else if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  pauseTimer() {
    this.isPaused = true;
  }

  resumeTimer() {
    this.isPaused = false;
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timeLeft = 330;
    this.timeLeftSubject.next({ minutes: this.displayMinutes, seconds: this.displaySeconds });
  }
}
