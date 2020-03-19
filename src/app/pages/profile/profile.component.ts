import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  guardar( usuario: Usuario ) {
    console.log( usuario );
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario ).subscribe( resp => {
      console.log( resp );
    });
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

  cambiarImagen(){
    console.log('cam biar imagen');
    console.log( this.imagenSubir );
    console.log( this.usuario._id );
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id);
  }

}
