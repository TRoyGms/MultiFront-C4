import { Component,Input,Output,EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { Subscription } from 'rxjs';
import { CodeboxService } from '../service/codebox.service';

@Component({
  selector: 'app-codebox',
  templateUrl: './codebox-img.component.html'
})
export class CodeboxComponent implements OnInit, OnDestroy {

  codeboxImg = 'codebox.png'

  @Input() codeboxes!: { _id: string; ladox1: number; ladox2: number; ladoy1: number; ladoy2: number; textura: string; codigo: string }[];
  nearCodeboxId: string | null = null; // Cambiado a string
  nearCodeboxMessage: string = '';
  nearCodeboxPosition: { x: number, y: number } | null = null;
  @Output() collected = new EventEmitter<void>();
  private codeboxNearSubscription!: Subscription;

  constructor(private gameLogic: GameLogicServiceService) {}

  ngOnInit(): void {
    this.gameLogic.loadCodebox(2);
    
    this.codeboxNearSubscription = this.gameLogic.codeboxNear$.subscribe((id) => {
      this.nearCodeboxId = id;

      if (id !== null) {
        const codebox = this.codeboxes.find(box => box._id === id); // Comparación con string
        if (codebox) {
          this.nearCodeboxMessage = codebox.codigo;
          this.nearCodeboxPosition = {
            x: codebox.ladox1,
            y: codebox.ladoy1,
          };
        }
      } else {
        this.nearCodeboxMessage = '';
        this.nearCodeboxPosition = null;
      }
    });
    console.log("CODEBOXES",this.codeboxes);


  }

  ngOnDestroy(): void {
    if (this.codeboxNearSubscription) {
      this.codeboxNearSubscription.unsubscribe();
    }
  }

  collect() {
    this.collected.emit();
  }
}
