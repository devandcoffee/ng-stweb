import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { TournamentsComponent } from './components/tournaments/tournaments.component';


export const ROUTES: Routes = [
  { path: 'tournaments', component: TournamentsComponent },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
