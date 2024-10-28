import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponentComponent } from './game-module/game-component/game-component.component';




export const routes: Routes = [
    {path:'game',component:GameComponentComponent},
    {path:'', redirectTo: "/game",pathMatch:'full'},
    {path:'**', redirectTo: '/game'}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
