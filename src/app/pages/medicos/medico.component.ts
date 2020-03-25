import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', '', '');
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _modalUploadService: ModalUploadService,
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
      activatedRoute.params.subscribe( params => {
        let id = params['id'];
        if ( id !== 'nuevo' ) {
          this.cargarMedico( id );
        }
      });
  }

  ngOnInit(): void {
    this._hospitalService.cargarHospitales()
      .subscribe((hospitales: any ) => {
        console.log(hospitales);
        this.hospitales = hospitales.hospitales;
      });

    this._modalUploadService.notificacion.subscribe( (resp: any) => {
        console.log(resp);
        this.medico.img = resp.medico.img;
    } );
  }

  guardarMedico(f: NgForm) {
    console.log('guardar médico');
    console.log(f.valid);
    console.log(f.value);
    if ( f.invalid ) {
      return;
    }
    this._medicoService.guardarMedico( this.medico )
        .subscribe( medico => {
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id])
        });
  }

  cambioHospital( id: string ) {
    console.log( id );
    this._hospitalService.obtenerHospital( id )
        .subscribe( (hospital: any) => {
          console.log(hospital);
          this.hospital = hospital;
        });
  }

  cargarMedico( id: string ) {
  this._medicoService.cargarMedico( id )
    .subscribe( (medico: any) => {
      console.log(medico);
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  cambiarFoto() {
    console.log('cambiar foto');
    this._modalUploadService.mostrarModal('medicos', this.medico._id);
  }

}
