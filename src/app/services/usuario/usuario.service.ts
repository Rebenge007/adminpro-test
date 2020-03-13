import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
// import * as swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
    console.log('Servicio de usuario para peticiones Http Ready!!!');
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ){
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token }).pipe(map( (resp: any) => {
      console.log('login Google line 60: ', resp);
      console.log( this.usuario );
      this.guardarStorage( resp.id, resp.token, resp.usuario );
      return true;
    }));
  }
  login( usuario: Usuario, recordar: boolean ) {
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario)
                    .pipe(map( (resp: any) => {
                      // localStorage.setItem('id', resp.id);
                      // localStorage.setItem('token', resp.token);
                      // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                      return true;
                    }));
  }
  crearUsuario( usuario: Usuario) {
    console.log( 'usuario: ', usuario );
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
    .pipe(
      map( (resp: any) => {
        console.log( resp );
        // swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );
  }

  actualizarUsuario( usuario: Usuario ) {
    console.log( usuario );
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario ).pipe(map( (resp: any) => {
      console.log( resp );
      // this.usuario = resp.usuario;
      let usuarioDB: Usuario = resp.usuario;
      this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
      // swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;
    }));
  }

  cambiarImagen( archivo: File, id: string) {
    console.log(archivo);
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp: any) => {
        console.log( resp );
        this.usuario.img = resp.usuario.img;
        // swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario );
      })
      .catch( resp => {
        console.log( resp );
      });
  }
}
