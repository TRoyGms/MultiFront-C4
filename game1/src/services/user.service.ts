import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cambia HttpClientModule a HttpClient
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = environment.API_URL;
   

  constructor(private http: HttpClient) {} 

  register(nombreusuario: string, contrasena: string): Observable<any> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(`${this.Url}usuario/register`, body);
  }

  login(nombreusuario: string, contrasena: string): Observable<any> {
    console.log("api url: ",this.Url)
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(`${this.Url}usuario/login`, body);
  }
}
