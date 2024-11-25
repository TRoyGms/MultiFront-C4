import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'; // Cambia HttpClientModule a HttpClient
import { Observable } from 'rxjs';
import { environment } from '../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url = environment.API_URL
   

  constructor(private http: HttpClient) {} 

  register(nombreusuario: string, contrasena: string): Observable<HttpResponse<any>> {
    const body = { nombreusuario, contrasena };
    return this.http.post<any>(`${this.Url}usuario/register`, body);
  }

  login(nombreusuario: string, contrasena: string): Observable<any> {
    
    const body = { nombreusuario, contrasena };
    const headers = new HttpHeaders().set('Content-Type', 'application/json')


    return this.http.post<any>(`${this.Url}usuario/login`, body,  { headers, observe: 'response' });
  }
}
