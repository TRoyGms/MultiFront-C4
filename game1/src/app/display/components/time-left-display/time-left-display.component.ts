import { Component, OnInit, OnDestroy } from '@angular/core';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'time-left-display',
  templateUrl: './time-left-display.component.html',
})
export class TimeLeftDisplayComponent implements OnInit, OnDestroy {
  displayMinutes = 5;
  displaySeconds = 30;

  private subscription: any;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.subscription = this.timerService.timeLeft$.subscribe(time => {
      this.displayMinutes = time.minutes;
      this.displaySeconds = time.seconds;
    });

    this.timerService.startTimer();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
