import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponentComponent } from './game-module/game-component/game-component.component';
import { RegisterComponent } from './user/components/register/register.component';
import { LoginComponent } from './user/components/login/login.component';
import { LvlSelectorComponent } from './game-module/components/lvl-selector/lvl-selector.component';




export const routes: Routes = [
    {path: 'registro', component:RegisterComponent},
    {path: 'login', component:LoginComponent},
    {path: 'main', component: LvlSelectorComponent},
    {path:'game',component:GameComponentComponent},
    {path:'', redirectTo: "/registro",pathMatch:'full'},
    {path:'**', redirectTo: '/registro'}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
