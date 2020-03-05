import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', Autor: 'Nombre Autor'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', Autor: 'Nombre Autor'} },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas', Autor: 'Nombre Autor'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', Autor: 'Nombre Autor'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs', Autor: 'Nombre Autor'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema', Autor: 'Nombre Autor'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
