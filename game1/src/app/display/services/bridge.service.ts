import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  private apiUrl = 'http://localhost:8000/puente';

  constructor(private http: HttpClient) {}

  getBridges(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => response.data)
    );
  }
}
