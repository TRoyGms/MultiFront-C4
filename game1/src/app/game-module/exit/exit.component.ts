import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html',
  styleUrl: './exit.component.css'
})
export class ExitComponent implements OnInit{


 exit! :{ladox1:number,ladox2:number,ladoy1:number,ladoy2:number,image:string};
 estado!:boolean
  private estadoSubscription!: Subscription;


  constructor(private gameLogic:GameLogicServiceService) {
  }

  ngOnInit(): void {
    this.exit = this.gameLogic.exit
    // Suscribirse al estado del servicio para recibir cambios
    this.estadoSubscription = this.gameLogic.estado$.subscribe((nuevoEstado) => {
      this.estado = nuevoEstado; // Actualiza el valor de 'estado' en el componente hijo
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción para evitar fugas de memoria
    if (this.estadoSubscription) {
      this.estadoSubscription.unsubscribe();
    }
  }
  
  
}
