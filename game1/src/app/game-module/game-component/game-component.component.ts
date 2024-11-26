import { Component, Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { CodeboxService } from '../../codebox/service/codebox.service';
import { TerminalService } from '../../../services/terminal.service';
import { BridgeService } from '../../../services/bridge.service';
import { Codebox } from '../../codebox/interface/codebox';
import { Terminal } from '../../terminal/interface/terminal';
import { Puente } from '../../game-module/Interface/puente';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrls: ['./game-component.component.css'],
})
export class GameComponentComponent implements OnInit {
  public codeboxes: Codebox[] = [];
  public terminales: Terminal[] = [];
  public bridges: Puente[] = [];
  public nivel: number = 1; // Variable para mostrar el nivel

  constructor(
    public codeboxS: CodeboxService,
    public terminalS: TerminalService,
    public bridgeS: BridgeService,
    public gameLogic: GameLogicServiceService
  ) {}

  ngOnInit(): void {
    const nivel = localStorage.getItem('idnivel');
    this.nivel = nivel ? parseInt(nivel, 10) : 1;
  
    // Cargar terminales
    this.terminalS.getTerminalsByLvl(this.nivel).subscribe(
      (response: Terminal[]) => {
        console.log('Terminales cargadas:', response);
        this.terminales = response; // No necesitamos acceder a 'data' si la respuesta es directamente un arreglo
      },
      (error) => console.error('Error al cargar terminales:', error)
    );
  
    // Cargar codeboxes
    this.codeboxS.getCodeboxesByLevel(this.nivel).subscribe(
      (response: Codebox[]) => {
        console.log('Codeboxes cargadas:', response);
        this.codeboxes = response; // Lo mismo, acceso directo a la respuesta
      },
      (error) => console.error('Error al cargar codeboxes:', error)
    );
  
    // Cargar puentes
    this.bridgeS.getBridgesByLvl(this.nivel).subscribe(
      (response: Puente[]) => {
        console.log('Puentes cargados:', response);
        this.bridges = response; // Acceso directo a la respuesta sin 'data'
      },
      (error) => console.error('Error al cargar puentes:', error)
    );
  }
  
    

  @Input() position!: { x: number; y: number };
}
