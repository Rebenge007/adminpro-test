import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe( numero => {
      console.log('subs', numero );
    },
    error => {
      console.error('error', error);
    },
    () => {
      console.log('elobservador termino! ');
    });
    // ejemplo del retry
    // cuando encuentra un error intenta una vez mas el proceso
    // por si alguna condicion ayuda a resolver al realizar un nuevo recorrido
    // this.regresaObservable().pipe(
    //   retry( 2 )
    // ).subscribe( numero => {
    //   console.log('subs', numero );
    // },
    // error => {
    //   console.error('error', error);
    // },
    // () => {
    //   console.log('elobservador termino! ');
    // });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    // finaliza el observable para que no se ejecute infinitamente.
    this.subscription.unsubscribe();
  }

    regresaObservable(): Observable<any>{
      return new Observable( ( observer: Subscriber<any> ) => {
        let contador = 0;
        const intervalo = setInterval( () => {
          contador++;
          const salida = {
            valor: contador
          }
          observer.next( salida);
          if ( contador === 3) {
            clearInterval( intervalo );
            observer.complete();
          }
          // condicion que genera la accion del retry( numero de veces a intentar)
          // if (contador === 2) {
          //   // clearInterval( intervalo );
          //   observer.error('Error en el observer')
          // }
        }, 1000);
      }).pipe(
        map( resp => {
          return resp.valor;
        }),
        filter( ( valor, index) => {
          console.log( 'Filter ', valor, index );
          if ( ( valor % 2 ) === 1 ) {
            // impar
            return true;
          } else {
            return false;
          }
        })
      );
    }


}
