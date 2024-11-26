import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importamos map para transformar la respuesta
import { Terminal } from '../app/terminal/interface/terminal';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getTerminalsByLvl(levelid: number): Observable<Terminal[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    });

    // Hacemos la solicitud y mapeamos la respuesta para devolver solo `data`
    return this.http.get<{ data: Terminal[] }>(`${this.url}terminal/nivel/${levelid}`, { headers })
      .pipe(
        map(response => response.data) // Extraemos la propiedad `data`
      );
  }
}
