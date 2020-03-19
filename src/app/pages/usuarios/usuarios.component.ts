import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

// declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = []; // carga el modelo del usuario
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( 
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde ).subscribe((resp: any) => {
      console.log( resp );
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  // método para la paginacion
  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {
    console.log( termino );
    if ( termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: any) => {
      console.log( usuarios );
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ) {
    console.log( usuario );
    if ( usuario._id === this._usuarioService.usuario._id ) {
      console.log('no puede borrar usuario actual');
      swal.fire('No se puede borrar usuario', 'No se puede borrar asi mismo', 'warning');
      return;
    }
    swal.fire({
      title: '¿Estas seguro?',
      text: '¿Esta a punto de borrar' + usuario.nombre + ' ' + usuario.apPaterno + ' ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    })
    .then(borrar => {
      if (borrar.value) {
        this._usuarioService.borrarUsuario( usuario._id ).subscribe( borrado => {
          console.log( borrado );
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
      this._usuarioService.actualizarUsuario( usuario ).subscribe( resp => {
        console.log( resp );
      });
  }

}
