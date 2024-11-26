import { Injectable, OnInit } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pared } from '../app/game-module/Interface/pared';
import { Pipe } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WallsService implements OnInit{

  URL = environment.API_URL

  constructor(private http: HttpClient) { }

  ngOnInit():void{
    this.getWalls()
  }

  getWalls():Observable <Pared[]>{
    const token= localStorage.getItem("token")
    const idnivel = localStorage.getItem("idnivel")

    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    }) 
    const Url = `${this.URL}pared/nivel/${2}`
    
    return this.http.get<{data:Pared[]}>(Url, {headers})
    .pipe(
      map((response) => response.data),
    )
  }
}
