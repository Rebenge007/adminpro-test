import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  totalMedicos: number = 0;
  usuario: Usuario;
  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
  ) { }

  cargarMedicos( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url ).pipe(map( (resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  obtenerMedico( id: string ){
    console.log( 'obtener medico', + id );
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url );
  }
}
