import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', Autor: 'Benjamin Zamudio'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', Autor: 'Benjamin Zamudio'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', Autor: 'Benjamin Zamudio'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', Autor: 'Benjamin Zamudio'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs', Autor: 'Benjamin Zamudio'} },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: { titulo: 'Ajustes del Tema', Autor: 'Benjamin Zamudio'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario', Autor: 'Benjamin Zamudio'} },
            // Manetnimiento
            {
                path: 'hospitales',
                component: HospitalesComponent,
                data: { titulo: 'Mantenimiento de Hospitales', Autor: 'Benjamin Zamudio' }
            },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios', Autor: 'Benjamin Zamudio'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
