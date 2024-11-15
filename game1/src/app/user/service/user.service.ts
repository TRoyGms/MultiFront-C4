/* import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://tu-api.com/api/register';
  private apiUrlLogin = 'https://tu-api.com/api/login'; 

  constructor(private http: HttpClient) {}

  register(nombreusuario: string, contrasena: string): Observable<any> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(this.apiUrl, body);
  }


  login(nombreusuario: string, contrasena: string): Observable<any> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(this.apiUrlLogin, body);
  }

}
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cambia HttpClientModule a HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = 'http://127.0.0.1:8000/usuario/';
   

  constructor(private http: HttpClient) {} 

  register(nombreusuario: string, contrasena: string): Observable<any> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(`${this.Url}register`, body);
  }

  login(nombreusuario: string, contrasena: string): Observable<any> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(`${this.Url}login`, body);
  }
}
