import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICredentials } from '../models/user';

@Injectable()
export class UsersService {

  private baseUrl = `/api/users`;

  constructor(private http: Http) { }

  login(credentials: ICredentials): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials)
      .map(response => response.json());
  }
}
