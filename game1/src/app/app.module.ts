import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { GameModuleModule } from './game-module/game-module.module';
import { DisplayModule } from './display/display.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GameModuleModule,
    DisplayModule
],
  providers: [],
  bootstrap: [AppComponent]  
})
export class AppModule { }
