import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { BridgeComponentComponent } from './bridge-component/bridge-component.component';
import { CameraComponentComponent } from './camera-component/camera-component.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { WallcomponentComponent } from './wallcomponent/wallcomponent.component';
import { DisplayModule } from '../display/display.module'; // Módulo donde está declarado BridgesDisplayComponent
import { UserModule } from '../user/user.module';
import { LevelsModule } from '../levels/levels.module';
import { LvlSelectorComponent } from './components/lvl-selector/lvl-selector.component';
import { TerminalModule } from '../terminal/terminal.module';
import { CodeboxModule } from '../codebox/codebox.module';

@NgModule({
  declarations: [
    PlayerComponentComponent,
    BridgeComponentComponent,
    CameraComponentComponent,
    GameComponentComponent,
    WallcomponentComponent,
    LvlSelectorComponent
  ],
  imports: [
    TerminalModule,
    CodeboxModule,
    CommonModule,
    DisplayModule, // DisplayModule maneja BridgesDisplayComponent
    UserModule,
    LevelsModule,
  ],
  exports: [
    GameComponentComponent, // Exportar el componente padre si es necesario
  ],
})
export class GameModuleModule { }
