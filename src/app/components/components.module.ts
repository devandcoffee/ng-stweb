import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { LoginModule } from './login/login.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TeamsModule } from './teams/teams.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule,
    LoginModule,
    TeamsModule,
    TournamentsModule
  ],
  declarations: [],
  exports: [
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
