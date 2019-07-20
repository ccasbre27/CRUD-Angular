import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

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
}
