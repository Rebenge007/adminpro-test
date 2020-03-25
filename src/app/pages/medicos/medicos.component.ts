import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
    medicos: Medico[] = [];
    desde: number = 0;
    totalRegistros: number = 0;
    cargando: boolean = true;

  constructor(
    public _modalUploadService: ModalUploadService,
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoService.cargarMedicos(this.desde).subscribe( medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  buscarMedicos( termino: string ) {
      console.log(termino);
      if ( termino.length <= 0 ) {
        this.cargarMedicos();
        return;
      }
      this.cargando = true;
      this._medicoService.buscarMedicos( termino ).subscribe( (medicos: any) => {
        console.log( medicos );
        this.medicos = medicos;
        this.cargando = false;
      });
  }

  crearMedico() {
    // ..
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
      this.cargarMedicos();
    }

    actualizarImagen( id ) {

    }

    guardarMedico( medico ) {
      //
    }

    borrarMedico( medico: Medico ) {
      this._medicoService.borrarMedico( medico._id )
      .subscribe( () =>{
        this.cargarMedicos();
      });
    }
}
