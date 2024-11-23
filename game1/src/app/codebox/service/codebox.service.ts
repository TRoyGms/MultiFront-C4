import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Codebox } from '../interface/codebox';

@Injectable({
  providedIn: 'root'
})
export class CodeboxService {
  private url=""

  constructor(private http: HttpClient) { }

  getCodeboxesByLevel(levelId: number): Observable<Codebox[]> {
    return this.http.get<Codebox[]>(`${this.url}?levelId=${levelId}`);
  }
}
