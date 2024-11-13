import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { BridgeComponentComponent } from './bridge-component/bridge-component.component';
import { CameraComponentComponent } from './camera-component/camera-component.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { WallcomponentComponent } from './wallcomponent/wallcomponent.component';
import { DisplayModule } from '../display/display.module';



@NgModule({
  declarations: [
    PlayerComponentComponent,
    BridgeComponentComponent,
    CameraComponentComponent,
    GameComponentComponent,
    WallcomponentComponent,

  ],
  imports: [
    CommonModule,
    DisplayModule
  ],exports:[
  ]
})
export class GameModuleModule { }
