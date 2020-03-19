import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  oculto: string = '';
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
    console.log('Modal listo !!!');
  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImage( archivo: File ) {
    console.log( archivo );
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal.fire( 'Sòlo imagenes', 'El archivo seleccionado no es una imagen', 'error')
      console.log('no es un aimagen');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    // preview de la imagen
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenTemp = reader.result as string;
    };
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
                             .then( resp => {
                               console.log( resp );
                               this._modalUploadService.notificacion.emit( resp );
                               this.cerrarModal();
                             })
                             .catch( err => {
                               console.log( err );
                             });
  }

}
