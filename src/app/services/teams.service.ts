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
    const filter = encodeURI('{\"include\"\:\"status\"}');
    const url = `${this.baseUrl}?filter=${filter}`;
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(url, options)
      .map(response => response.json());
  }

  getTeam(id: number): Observable<ITeam> {
    const url = `${this.baseUrl}/${id} `;
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });

    if (id === 0) {
      return Observable.create((observer: any) => {
        observer.next(this.initializeTeam());
        observer.complete();
      });
    } else {
      return this.http
        .get(url, options)
        .map(response => response.json());
    }
  }

  deleteTeam(id: number): Observable<Response> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    });
    const options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .map(response => response.json());
  }

  saveTeam(team: ITeam): Observable<ITeam> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    });
    const options = new RequestOptions({ headers: headers });

    if (team.id === '') {
      return this.createTeam(team, options);
    }
    return this.updateTeam(team, options);
  }

  private createTeam(team: ITeam, options: RequestOptions): Observable<ITeam> {
    team.id = undefined;
    return this.http
      .post(this.baseUrl, team, options)
      .map(response => response.json());
  }

  private updateTeam(team: ITeam, options: RequestOptions): Observable<ITeam> {
    const url = `${this.baseUrl}/${team.id}`;
    return this.http
      .put(url, team, options)
      .map(response => response.json());
  }

  initializeTeam(): ITeam {
    return {
      id: '',
      name: '',
      statusId: ''
    };
  }
}
