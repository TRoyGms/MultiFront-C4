import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { WallsService } from '../../../services/walls.service';
import { Pared } from '../Interface/pared';

@Component({
  selector: 'app-wallcomponent',
  templateUrl: './wallcomponent.component.html',
  styleUrl: './wallcomponent.component.css'
})
export class WallcomponentComponent {
  @Input() walls: { ladox1: number; ladox2: number; ladoy1: number; ladoy2: number; textura: string }[];

   constructor(private gameLogic: GameLogicServiceService) {
    this.walls = this.gameLogic.walls; // Inicializa aquí
  } 
}

   /*  public walls: Pared [] = []
    constructor(private wallsServ: WallsService){}

    ngOnInit(): void {
        this.loadWalls()
    }
    private loadWalls():void{
      this.wallsServ.getWalls().subscribe({
        next: (data) => {
          this.walls = data,
          console.log("walls: ",data)
        }
      }) */

  
/* } */
