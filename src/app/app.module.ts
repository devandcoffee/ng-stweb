import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';

import { TournamentsService } from './services/tournaments.service';
import { UsersService } from './services/users.service';
import { TournamentTypesService } from './services/tournament-types.service';

import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ROUTING,
    ComponentsModule
  ],
  providers: [TournamentsService, UsersService, TournamentTypesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
