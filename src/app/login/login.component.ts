import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any; // guasrdara la informaciom que recibamos de google

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '944699229021-hendaf1609kumdi95r8fp7nau5tsph7u.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin( document.getElementById('btnGoogle') );
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      // console.log( googleUser.getAuthResponse() );
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token ).subscribe( () => {
        console.log( 'usuario autenticado');
        // this.router.navigate(['/dashboard']);
        window.location.href = '#/dashboard';
      });
      console.log( token );
    } );
  }

  ingresar( forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, 'apPaterno', forma.value.email, forma.value.password );
    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe( () => {
      this.router.navigate(['/dashboard']);
    });
    // this.router.navigate(['./dashboard']);
    console.log( forma.valid );
    console.log( forma.value );
  }

}
