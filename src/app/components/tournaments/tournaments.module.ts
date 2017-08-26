import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';

import { TournamentsComponent } from './tournaments.component';


@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [TournamentsComponent],
  exports: [TournamentsComponent]
})
export class TournamentsModule {
}
