import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  usuario: Usuario;
  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log('Servicio de Hospital para peticiones Http Ready!!!');
  }

  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  obtenerHospital( id: string ) {
    console.log( 'obtener hospital', id );
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );
  }

  borrarHospital( id: string) {
    console.log( id );
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' +  this._usuarioService.token;
    return this.http.delete( url ).pipe(map(resp => {
      swal.fire('Hospital Borrado!', 'el hospital ha sido borrado exitosamente !', 'success');
      return;
    }));
  }

  crearHospital( nombre: string ) {
    console.log( 'hospital: ', nombre );
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' +  this._usuarioService.token;
    return this.http.post( url, {nombre} )
    .pipe(
      map( (resp: any) => {
        console.log( resp );
        swal.fire('Hospital creado', nombre, 'success');
        return resp.hospital;
      })
    );
  }


  buscarHospital( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(map( (resp: any) => {
      console.log(resp);
      return resp.hospitales;
    }));
  }

  actualizarHospìtal( hospital: Hospital ) {
    console.log( Hospital );
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    return this.http.put( url, hospital ).pipe(map( (resp: any) => {
      swal.fire('hospital Actualizado ', hospital.nombre, 'success');
      return resp.hospital;
    }));
  }
}
