import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Terminal } from '../interface/terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  private url=""

  constructor(private http: HttpClient) { }

  getTerminalsByLvl(levelid: number):Observable<Terminal[]>{
    return this.http.get<Terminal[]>(`${this.url}?levelid=${levelid}`)
  }
}
