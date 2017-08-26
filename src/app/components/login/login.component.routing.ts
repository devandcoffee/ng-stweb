import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const ROUTES: Routes = [{ path: '', component: LoginComponent }];

export const ROUTING: ModuleWithProviders = RouterModule.forChild(ROUTES);
