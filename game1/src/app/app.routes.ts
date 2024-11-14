import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponentComponent } from './game-module/game-component/game-component.component';
import { RegisterComponent } from './user/components/register/register.component';
import { LoginComponent } from './user/components/login/login.component';




export const routes: Routes = [
    {path:'game',component:GameComponentComponent},
    {path: 'registro', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path:'', redirectTo: "/game",pathMatch:'full'},
    {path:'**', redirectTo: '/game'}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
