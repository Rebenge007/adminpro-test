import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import { HospitalService } from '../../services/service.index';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
    hospitales: Hospital[] = [];
    desde: number = 0;
    totalRegistros: number = 0;
    cargando: boolean = true;

  constructor( 
    public _modalUploadService: ModalUploadService,
    public _hospitalService: HospitalService ) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => {
      console.log( resp );
      this.cargarHospitales();
    });
  }

  actualizarImagen( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde ).subscribe((resp: any) => {
      console.log( resp );
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarHospital( termino ).subscribe( (hospitales: any) => {
      console.log( hospitales );
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  borrarHospital( hospital: Hospital ) {
    console.log( hospital );
    this._hospitalService.borrarHospital( hospital._id ).subscribe( borrado => {
      console.log( borrado );
      this.cargarHospitales();
    });
  }

  guardarHospital( hospital: Hospital ) {
      this._hospitalService.actualizarHospìtal( hospital ).subscribe( resp => {
        console.log( resp );
      });
  }

  crearHospital( nombre: string ) {
    console.log('crear hospital ' + nombre);
    swal.fire({
      title: 'Crear Hospital nuevo',
      input: 'text',
      icon: 'info',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      console.log( result );
      if (result.value) {
        this._hospitalService.crearHospital( result.value ).subscribe( (resp: any) => {
          console.log( resp );
          swal.fire('Hospital creado correctamente', resp.nombre, 'success' );
          this.cargarHospitales();
        });
      }
    });
  }
}
