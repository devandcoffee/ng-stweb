import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ITeam } from '../models/teams';


@Injectable()
export class TeamsService {

  private baseUrl = `${environment.apiUrl}/api/teams`;

  constructor(private http: Http) { }

  getTeams(): Observable<ITeam[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.baseUrl, options)
      .map(response => response.json());
  }
}
