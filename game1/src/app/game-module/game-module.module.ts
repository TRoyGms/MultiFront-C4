import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponentComponent } from './player-component/player-component.component';
import { BridgeComponentComponent } from './bridge-component/bridge-component.component';
import { CameraComponentComponent } from './camera-component/camera-component.component';
import { GameComponentComponent } from './game-component/game-component.component';
import { WallcomponentComponent } from './wallcomponent/wallcomponent.component';
import { DisplayModule } from '../display/display.module';
import { UserModule } from '../user/user.module';
import { RegisterComponent } from '../user/components/register/register.component';
import { LoginComponent } from '../user/components/login/login.component';

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
    DisplayModule,
    UserModule
  ],exports:[
   
  ]
})
export class GameModuleModule { }
