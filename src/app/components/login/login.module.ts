import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export default class LoginModule {
}
