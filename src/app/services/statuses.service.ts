import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { IStatus } from '../models/status';


@Injectable()
export class StatusesService {

  private baseUrl = `${environment.apiUrl}/api/statuses`;

  constructor(private http: Http) { }

  getStatuses(): Observable<IStatus[]> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new Headers({ 'Authorization': accessToken });
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.baseUrl, options)
      .map(response => response.json());
  }
}
