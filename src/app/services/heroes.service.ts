import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-angular-4247d.firebaseio.com';

  constructor( private http: HttpClient ) {

  }

  addHeroe( heroe: HeroeModel) {
    // se agrega al path el .json porque firebase lo requiere, en los backend
    // propios no se debe agregar
    return this.http.post(`${ this.url }/heroes.json`, heroe)
      .pipe( map( (resp: any )=> {
        heroe.id = resp.name;
        return heroe;
      }));
  }

  updateHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      // el operador ... toma cada una de las propiedades y crea un objeto con las misamas
      ...heroe
    };

    // eliminamos el id porque firebase agregaría un atributo id de más
    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroe( id: string ) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( this.createArray), delay(1500)
        );

    /*
    el código anterior equivale al siguiente
    return this.http.get(`${ this.url }/heroes.json`)
      .pipe(
        map( (resp: any )=> {
          return this.createArray(resp)}
        ));

    */
  }
  
  deleteHeroe( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  private createArray( heroesObj: object ) {
    const heroes: HeroeModel[] = [];

    if ( heroesObj === null ) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
