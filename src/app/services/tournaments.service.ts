import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import { ITournament } from '../models/tournament';

import 'rxjs/add/operator/map';

@Injectable()
export class TournamentsService {

  private baseUrl = `${environment.apiUrl}/api/tournaments`;

  constructor(private http: Http) { }

  getTournaments(): Observable<ITournament[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.baseUrl, options)
      .map(response => response.json());
  }

  getTournament(id: number): Observable<ITournament> {
    const url = `${this.baseUrl}/${id}`;
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });

    if (id === 0) {
      return Observable.create((observer: any) => {
        observer.next(this.initializeTournament());
        observer.complete();
      });
    } else {
      return this.http
        .get(url, options)
        .map(response => response.json());
    }
  }

  deleteTournament(id: number): Observable<Response> {
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

  saveTournament(tournament: ITournament): Observable<ITournament> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': accessToken
    });
    const options = new RequestOptions({ headers: headers });

    if (tournament.id === '') {
      return this.createTournament(tournament, options);
    }
    return this.updateTournament(tournament, options);
  }

  private createTournament(tournament: ITournament, options: RequestOptions): Observable<ITournament> {
    tournament.id = undefined;
    return this.http
      .post(this.baseUrl, tournament, options)
      .map(response => response.json());
  }

  private updateTournament(tournament: ITournament, options: RequestOptions): Observable<ITournament> {
    const url = `${this.baseUrl}/${tournament.id}`;
    return this.http
      .put(url, tournament, options)
      .map(response => response.json());
  }

  initializeTournament(): ITournament {
    return {
      id: '',
      name: '',
      description: '',
      start_date: null,
      amount_teams: 1,
      tournamentTypeId: 0,
    };
  }
}
