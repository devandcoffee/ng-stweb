import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { UsersService } from '../../services/users.service';
import { ICredentials, IUserInfo } from '../../models/user';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  credentials: ICredentials;
  badCredentials: boolean;

  constructor(private router: Router, private usersService: UsersService) {
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
      this.usersService.login(this.credentials).subscribe(
        (userInfo: IUserInfo) => this.processUserInfo(userInfo),
        err => this.processError(err)
      );
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
    localStorage.setItem('accessToken', userInfo.id);
    localStorage.setItem('userId', userInfo.userId);
    this.router.navigate(['/tournaments']);
  }
}
