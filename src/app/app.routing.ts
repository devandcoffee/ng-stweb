import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TournamentsComponent } from './components/tournaments/tournaments.component';


export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'teams', component: TeamsComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
