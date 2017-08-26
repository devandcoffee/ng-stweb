import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';

import { LoginComponent } from './login.component';
import { ROUTING } from './login.component.routing';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, ROUTING],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export default class LoginModule {
}
