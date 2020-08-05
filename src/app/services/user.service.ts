import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaningList } from '../models/planingList';

@Injectable()
export class UserService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  getPlaningList(): Observable <PlaningList> {
    return this.http.get<PlaningList>(`${this.url}/planing_list`);
  }

}
