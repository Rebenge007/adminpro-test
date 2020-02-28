import { NgModule } from "@angular/core";

import { NopagefounbdComponent } from './nopagefounbd/nopagefounbd.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        NopagefounbdComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    exports: [
        NopagefounbdComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ]
})
export class SharedModule { }