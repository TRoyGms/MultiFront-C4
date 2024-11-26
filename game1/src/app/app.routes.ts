import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GameComponentComponent } from './game-module/game-component/game-component.component';
import { RegisterComponent } from './user/components/register/register.component';
import { LoginComponent } from './user/components/login/login.component';
import { LvlSelectorComponent } from './game-module/components/lvl-selector/lvl-selector.component';
import { ControlSelectorComponent } from './display/components/control-selector/control-selector.component';
import { AuthGuard } from './guards/auth.guard';



export const routes: Routes = [
    //{path: 'control', component:ControlSelectorComponent},
    {path: 'login', component:LoginComponent},
    {path: 'registro', component:RegisterComponent},
    {path: 'select_lvl', component: LvlSelectorComponent, canActivate: [AuthGuard]},
    {path:'game',component:GameComponentComponent, canActivate: [AuthGuard]},
    {path:'', redirectTo: "/login",pathMatch:'full'},
    {path:'**', redirectTo: '/login'},

];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}
