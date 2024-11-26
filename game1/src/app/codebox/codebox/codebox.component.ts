import { Component,Input,Output,EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-codebox',
  templateUrl: './codebox.component.html',
  styleUrl: './codebox.component.css'
})
export class CodeboxComponent implements OnInit,OnDestroy {
  @Input() codeBoxes!: { id: number; ladox1: number; ladox2: number; ladoy1: number; ladoy2: number; textura: string; codigo: string }[];
  nearCodeboxId: number | null = null;  // ID del CodeBox cercano
  nearCodeboxMessage: string = '';  // Mensaje del CodeBox cercano
  nearCodeboxPosition: { x: number, y: number } | null = null;  // Posición del CodeBox cercano
  @Output() collected = new EventEmitter<void>(); // Evento para notificar recolección
  private codeboxNearSubscription!: Subscription;

  constructor(private gameLogic: GameLogicServiceService) {}

  ngOnInit(): void {
    // Suscribirse a la detección de CodeBox cercano
    this.gameLogic.codeboxNear$.subscribe((id) => {
      this.nearCodeboxId = id;

      if (id !== null) {
        // Buscar el CodeBox y su mensaje
        const codebox = this.codeBoxes.find(box => box.id === id);
        if (codebox) {
          this.nearCodeboxMessage = codebox.codigo;
          this.nearCodeboxPosition = {
            x: codebox.ladox1,
            y: codebox.ladoy1 -30
          };
        }
      } else {
        this.nearCodeboxMessage = '';  // No hay mensaje si no hay CodeBox cercano
        this.nearCodeboxPosition = null;  // Resetear posición
      }
    });
  }

  ngOnDestroy(): void {
    // Asegurarse de desuscribirse cuando el componente se destruya
    if (this.codeboxNearSubscription) {
      this.codeboxNearSubscription.unsubscribe();
    }
  }

  collect() {
    // Emitir evento para recolectar el CodeBox
    this.collected.emit();
  }


}
