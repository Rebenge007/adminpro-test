import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
