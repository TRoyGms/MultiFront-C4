import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { GameLogicServiceService } from '../../../../services/game-logic-service.service';
import { TimerService } from '../../services/timer.service';

@Component({
  selector: 'app-game-over-alert',
  templateUrl: './game-over-alert.component.html',
})
export class GameOverAlertComponent implements OnInit, OnDestroy {
  @Output() restartLevel = new EventEmitter<void>();
  @Output() exitLevel = new EventEmitter<void>();

  constructor(
    private timerService: TimerService,
    private gameLogic: GameLogicServiceService
  ) {}

  ngOnInit(): void {
    this.timerService.timerFinished$.subscribe(() => {
      this.gameLogic.setGameOverState(true);
    });
  }

  ngOnDestroy() {
    this.timerService.timerFinished$;
  }

  onRestart() {
    this.restartLevel.emit();
    this.gameLogic.setGameOverState(false);
  }

  onExit() {
    this.exitLevel.emit();
    this.gameLogic.setGameOverState(false);
  }
}
