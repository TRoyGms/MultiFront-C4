import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '../app/levels/interface/level';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  private Url = ''

  constructor(private http: HttpClient) { }

  getLvls():Observable<Level[]>{
    return this.http.get<Level[]>(this.Url)
  }
}
