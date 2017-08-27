import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class TournamentTypesService {

  private baseUrl = `${environment.apiUrl}/api/tournamenttypes`;

  constructor(private http: Http) { }

  getTournamentTypes() {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.baseUrl, options)
      .map(response => response.json());
  }

}
