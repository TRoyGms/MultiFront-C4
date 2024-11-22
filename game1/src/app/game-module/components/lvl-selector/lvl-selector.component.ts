import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../../../levels/interface/level';
import { LevelService } from '../../../levels/service/level.service';

@Component({
  selector: 'lvl-selector',
  templateUrl: './lvl-selector.component.html',

})
export class LvlSelectorComponent implements OnInit{
  private levels: Level [] = []

  constructor(private router: Router, private lvlService: LevelService){}

  ngOnInit(): void {
      this.loadLvls()
  }

  private loadLvls():void {
    this.lvlService.getLvls().subscribe({
      next: (data) => (this.levels = data),
      error: (_error) => (console.error("error al cargar niveles: ",_error))
    })
  }

  navigateToLvl(levelid: number): void{
    //logica para cargar el nivel
  }

  logOff():void{
    localStorage.clear()
    this.router.navigate(["register"])
  }

  toSettings():void{
    
  }

  
}
