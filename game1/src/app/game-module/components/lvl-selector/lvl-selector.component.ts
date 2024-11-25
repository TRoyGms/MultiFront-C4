import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../../../levels/interface/level';
import { LevelService } from '../../../../services/level.service';
import { LvlCardComponent } from '../../../levels/components/lvl-card/lvl-card.component';

@Component({
  selector: 'lvl-selector',
  templateUrl: './lvl-selector.component.html',

})
export class LvlSelectorComponent implements OnInit{
  public levels: Level [] = []

  constructor(private router: Router, private lvlService: LevelService){}

  ngOnInit(): void {
      this.loadLvls()
  }

  private loadLvls():void {
    this.lvlService.getLvls().subscribe({
      next: (data) => {
        this.levels = data,
      console.log("niveles en local: ",this.levels)},

      error: (_error) => (console.error("error al cargar niveles: ",_error))
    })
  }

  navigateToLvl(idnivel: number): void{
    //logica para cargar el nivel
  }

  logOff():void{
    localStorage.clear()
    this.router.navigate(["register"])
  }

  toSettings():void{
    
  }

}
