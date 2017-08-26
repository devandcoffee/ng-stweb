import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentsComponent } from './tournaments/tournaments.component';
import LoginModule from './login/login.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    LoginModule,
    ReactiveFormsModule
  ],
  declarations: [TournamentsComponent],
  exports: [
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
