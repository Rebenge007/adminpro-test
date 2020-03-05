import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    this.contarTres().then( mensaje => { console.log( 'Termino!', mensaje ); } )
    // en caso de recibir un mensaje de la funcion resolve
    // promesa.then( mensaje => { console.log( 'Termino!', mensaje ); } )
    // promesa.then( () => { console.log( 'Termino!' ); } )
    .catch( error => { console.error( 'Error en la promesa', error ); });
  }

  ngOnInit(): void {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;
        if ( contador === 3 ) {
          resolve( true );
          // envia mensaje al then de la promesa
          // resolve( 'mensaje de exito' );
          // en caso de eeror se puede controlar el mensaje
          // reject( 'error personalizado' );
          clearInterval( intervalo );
        }
      }, 1000);
    });
  }

}
