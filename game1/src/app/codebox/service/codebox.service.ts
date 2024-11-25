import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importamos map
import { Codebox } from '../interface/codebox';
import { environment } from '../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CodeboxService {
  private url = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCodeboxesByLevel(levelId: number): Observable<Codebox[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    });

    return this.http
      .get<{ data: Codebox[] }>(`${this.url}bloqueCodigo/nivel/${levelId}`, { headers })
      .pipe(map((response) => response.data)); // Extraemos la propiedad `data`
  }
}
