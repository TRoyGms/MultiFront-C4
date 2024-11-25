import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Level } from '../app/levels/interface/level';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class LevelService implements OnInit{

  private Url = environment.API_URL

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
      this.getLvls()
  }

  getLvls():Observable<Level[]>{
    const idusuario=localStorage.getItem("idusuario")
    const token= localStorage.getItem("token")

    console.log("id: ",idusuario)
    console.log("token: ",token)

    if(!idusuario){
      this.router.navigate(['login'])
      throw new Error('Usuario no autenticado')
    }

    if (!token) {
      this.router.navigate(['login']);
      throw new Error('Token no encontrado, redirigiendo al login');
    }

    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    })

    const url = `${this.Url}nivel/niveles_usuario/${idusuario}`
    return this.http.get<Level[]>(url, {headers} )
  }
}
