import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefounbdComponent } from './shared/nopagefounbd/nopagefounbd.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        // loadChildren: './pages/pages.module#PagesModule'   // angular 8
        loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule), // angular 9
    },
    { path: '**', component: NopagefounbdComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
