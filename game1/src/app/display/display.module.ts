import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './components/header-container/header-container.component';
import { ActivatedTerminalIndicatorComponent } from './components/activated-terminal-indicator/activated-terminal-indicator.component';
import { BridgesDisplayComponent } from './components/bridges-display/bridges-display.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { MainWallsComponent } from './components/main-walls/main-walls.component';
import { TimeLeftDisplayComponent } from './components/time-left-display/time-left-display.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { ConfirmExitModalComponent } from './components/exit-modal/confirm-exit-modal.component';
import { GameOverAlertComponent } from './components/game-over-alert/game-over-alert.component';




@NgModule({
  declarations: [
    HeaderContainerComponent,
    ActivatedTerminalIndicatorComponent,
    BridgesDisplayComponent,
    GameBoardComponent,
    MainWallsComponent,
    TimeLeftDisplayComponent,
    MenuButtonComponent,
    SettingsModalComponent,
    GameOverAlertComponent,
    ConfirmExitModalComponent
  ],
  imports: [
    CommonModule,
 
  ],
  exports:[
    HeaderContainerComponent,
    ActivatedTerminalIndicatorComponent,
    BridgesDisplayComponent,
    GameBoardComponent,
    MainWallsComponent,
    TimeLeftDisplayComponent,
    MenuButtonComponent,
    SettingsModalComponent
  ]
})
export class DisplayModule { }
