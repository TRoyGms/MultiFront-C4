import { Component,Input, OnInit } from '@angular/core';
import { GameLogicServiceService } from '../../../services/game-logic-service.service';
import { CodeboxService } from '../../codebox/service/codebox.service';
import { TerminalService } from '../../../services/terminal.service';
import { Codebox } from '../../codebox/interface/codebox';
import { Terminal } from '../../terminal/interface/terminal';
import { TerminalImgComponent } from '../../terminal/terminal-img/terminal-img.component';

@Component({
  selector: 'app-game-component',
  templateUrl: './game-component.component.html',
  styleUrl: './game-component.component.css'
})

export class GameComponentComponent implements OnInit {
  public codeboxes: Codebox[] = [];
  public terminales: Terminal[] = [];

  constructor(
    public codeboxS: CodeboxService, 
    public terminalS: TerminalService,  
    public gameLogic: GameLogicServiceService
  ) {}

  ngOnInit(): void {
    const nivel = localStorage.getItem('idnivel');
    const idnivel = nivel ? parseInt(nivel, 10) : 0;

    this.terminalS.getTerminalsByLvl(idnivel).subscribe(
      (response: Terminal[]) => {
        console.log("respuesta de las terminales ",response)
        this.terminales = response;
      },
      (error) => {
        console.error('Error al obtener terminales:', error);
      }
    )

    /*this.codeboxS.getCodeboxesByLevel(idnivel).subscribe(
      (response: Codebox[]) => {
        console.log("respuesta de las codeboxes ",response)
        this.codeboxes = response;
      },
      (error) => {
        console.error('Error al obtener codeboxes:', error);
      }
    );*/
  }

  @Input() position!: { x: number; y: number };
}
