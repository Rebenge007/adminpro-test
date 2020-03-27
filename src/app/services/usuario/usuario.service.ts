import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
    console.log('Servicio de usuario para peticiones Http Ready!!!');
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevaToken';
    url += '?token=' + this.token;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        console.log(resp);
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      }),
      catchError( (err: any) => {
        console.log('object', err);
        this.router.navigate(['/login'])
        swal.fire('No se pudo renovar token', 'No fue posible la renovación del token', 'error');
        return throwError( err );
      })
    );
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario, menu: any ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);

  }

  loginGoogle( token: string ){
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token }).pipe(map( (resp: any) => {
      console.log('login Google line 60: ', resp);
      console.log( this.usuario );
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
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
                      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
                      return true;
                    }),
                    catchError( (err: any) => {
                      console.log('object', err);
                      swal.fire('Error en el login', err.error.mensaje, 'error');
                      return throwError( err );
                    }));
  }
  crearUsuario( usuario: Usuario) {
    console.log( 'usuario: ', usuario );
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, usuario )
    .pipe(
      map( (resp: any) => {
        console.log( resp );
        swal.fire('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError( (err: any) => {
        console.log('object', err);
        swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return throwError( err );
      })
    );
  }

  actualizarUsuario( usuario: Usuario ) {
    console.log( usuario );
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put( url, usuario ).pipe(
      map( (resp: any) => {
        console.log( resp );
        if ( usuario._id === this.usuario._id ) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu );
        }
        // this.usuario = resp.usuario;
        swal.fire('Usuario Actualizado ', usuario.nombre, 'success');
        return true;
      })),
      catchError( (err: any) => {
        console.log('object', err);
        swal.fire(err.error.mensaje, err.error.errors.message, 'error');
        return throwError( err );
      }
    );
  }

  cambiarImagen( archivo: File, id: string) {
    console.log(archivo);
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp: any) => {
        console.log( resp );
        this.usuario.img = resp.usuario.img;
        swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch( resp => {
        console.log( resp );
      });
  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(map( (resp: any) => {
      resp.usuarios;
      console.log( resp );
    }));
  }

  borrarUsuario( id: string) {
    console.log( id );
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' +  this.token;
    return this.http.delete( url ).pipe(map(resp => {
      swal.fire('Usuario Borrado!', 'el usuario ha sido borrado exitosamente !', 'success');
      return;
    }));
  }
}
