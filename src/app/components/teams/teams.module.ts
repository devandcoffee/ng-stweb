import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from 'clarity-angular';

import { TeamsComponent } from './teams.component';

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule],
  declarations: [TeamsComponent],
  exports: [TeamsComponent]
})
export class TeamsModule {
}
