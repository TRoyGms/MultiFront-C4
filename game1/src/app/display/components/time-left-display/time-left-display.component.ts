import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'time-left-display',
  templateUrl: './time-left-display.component.html',
})
export class TimeLeftDisplayComponent implements OnInit, OnDestroy {
  displayMinutes = 5;
  displaySeconds = 30;
  isGameOver = false;

  private subscription: any;
  private timerFinishedSubscription: any;

  constructor(private timerService: TimerService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.timerService.timeLeft$.subscribe(time => {
      this.displayMinutes = time.minutes;
      this.displaySeconds = time.seconds;
    });

    this.timerFinishedSubscription = this.timerService.timerFinished$.subscribe(() => {
      this.isGameOver = true;
    });

    this.timerService.startTimer();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    if (this.timerFinishedSubscription) this.timerFinishedSubscription.unsubscribe();
    this.timerService.clearTimer();
  }

  restartLevel() {
    this.isGameOver = false;
    window.location.reload();
  }

  exitLevel() {
    this.router.navigate(['/select_lvl']);
  }

  getFormattedTime(): string {
    const formattedSeconds = this.displaySeconds < 10 ? '0' + this.displaySeconds : this.displaySeconds;
    return `${this.displayMinutes}:${formattedSeconds}`;
  }
}
