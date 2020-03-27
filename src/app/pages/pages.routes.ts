import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    // {
        // path: '',
        // component: PagesComponent,
        // canActivate: [ LoginGuardGuard ], // permite la autenticacion del login
        // children: [
            {
                path: 'dashboard', 
                canActivate: [VerificaTokenGuard],
                component: DashboardComponent, 
                data: { titulo: 'Dashboard', Autor: 'Benjamin Zamudio'}
            },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', Autor: 'Benjamin Zamudio'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', Autor: 'Benjamin Zamudio'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', Autor: 'Benjamin Zamudio'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs', Autor: 'Benjamin Zamudio'} },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                data: { titulo: 'Ajustes del Tema', Autor: 'Benjamin Zamudio'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario', Autor: 'Benjamin Zamudio'} },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador', Autor: 'Benjamin Zamudio'} },
            // Manetnimiento
            {
                path: 'medicos',
                component: MedicosComponent,
                data: { titulo: 'Mantenimiento de Medicos', Autor: 'Benjamin Zamudio' }
            },
            {
                path: 'medico/:id',
                component: MedicoComponent,
                data: { titulo: 'Actualizar Medico', Autor: 'Benjamin Zamudio' }
            },
            {
                path: 'hospitales',
                component: HospitalesComponent,
                data: { titulo: 'Mantenimiento de Hospitales', Autor: 'Benjamin Zamudio' }
            },
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [ AdminGuard ],
                data: { titulo: 'Mantenimiento de Usuarios', Autor: 'Benjamin Zamudio'} 
            },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        // ]
    // }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
