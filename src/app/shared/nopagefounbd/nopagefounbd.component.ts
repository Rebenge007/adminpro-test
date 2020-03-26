import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefounbd',
  templateUrl: './nopagefounbd.component.html',
  styleUrls: ['./nopagefounbd.component.css']
})
export class NopagefounbdComponent implements OnInit {
  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
