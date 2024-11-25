import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class BridgeService {
  private apiUrl = environment.API_URL

  constructor(private http: HttpClient) {}

  getBridges(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response: any) => response.data)
    );
  }
}
