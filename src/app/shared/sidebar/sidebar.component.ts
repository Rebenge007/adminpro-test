import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor(
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
  }

}
