import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _modalUploadService: ModalUploadService,
    public _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
  }

}
