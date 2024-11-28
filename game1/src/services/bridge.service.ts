import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importamos el operador map
import { Puente } from '../app/game-module/Interface/puente';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getBridgesByLvl(levelid: number): Observable<Puente[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    });

    return this.http
      .get<{ data: Puente[] }>(`${this.url}puente/nivel/${6}`, { headers })
      .pipe(map((response) => response.data)); // Extraemos la propiedad `data`
  }
}
