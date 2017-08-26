import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { ICredentials } from '../models/user';


@Injectable()
export class UsersService {

  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: Http) { }

  login(credentials: ICredentials): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials)
      .map(response => response.json());
  }
}
