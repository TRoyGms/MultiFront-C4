import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Terminal } from '../app/terminal/interface/terminal';
import { environment } from '../enviroments/enviroments';


@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private url = environment.API_URL

  constructor(private http: HttpClient) { }

  getTerminalsByLvl(levelid: number):Observable<Terminal[]>{
    const token= localStorage.getItem("token")
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token}` 
    });

    return this.http.get<Terminal[]>(`${this.url}terminal/nivel/${levelid}`, { headers })
  }
}
