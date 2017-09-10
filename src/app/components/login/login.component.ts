import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IUserInfo } from '../../models/user';
import { AlertService } from '../../services/alert.service';
import { LOGIN_FAILED, LOGGED_IN } from './messages';

const Login = gql`
mutation Login($authData: AuthData) {
  signIn(authData: $authData) {
    token
  }
}
`;

@Component({
  moduleId: module.id,
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  credentials: any;
  badCredentials: boolean;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login(): void {
    if (this.loginForm.dirty && this.loginForm.valid) {
      this.credentials = this.loginForm.value;
      this.apollo.mutate({
        mutation: Login,
        variables: {
          'authData': {
            email: this.credentials.email,
            password: this.credentials.password
          }
        }
      }).subscribe(token => {
        if ('signIn' in token.data && token.data['signIn']) {
          this.alertService.show(LOGGED_IN);
          localStorage.setItem('token', token.data['signIn']['token']);
          this.router.navigate(['/tournaments']);
        } else {
          this.alertService.show(LOGIN_FAILED);
        }
      }, err => {
        this.alertService.show(LOGIN_FAILED);
      });
    }
  }

  removeError(): void {
    this.badCredentials = false;
  }

  private processError(err): void {
    if (err.status === 401) {
      this.badCredentials = true;
    }
    this.loginForm.reset();
  }

  private processUserInfo(userInfo: IUserInfo): void {
    // localStorage.setItem('accessToken', userInfo.id);
    // localStorage.setItem('userId', userInfo.userId);
    // this.router.navigate(['/tournaments']);
  }
}
