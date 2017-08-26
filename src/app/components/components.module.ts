import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TournamentsComponent } from './tournaments/tournaments.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  declarations: [TournamentsComponent],
  exports: [
    ClarityModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
