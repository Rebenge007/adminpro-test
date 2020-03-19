import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nopagefounbd',
  templateUrl: './nopagefounbd.component.html',
  styleUrls: ['./nopagefounbd.component.css']
})
export class NopagefounbdComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
