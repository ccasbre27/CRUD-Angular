import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: HeroeModel[] = [];
  
  constructor( private heroesService: HeroesService ) { }

  ngOnInit() {
    this.heroesService.getHeroes()
      .subscribe( (resp: any) => {
        this.heroes = resp;
      });
  }

  deleteHeroe( heroe: HeroeModel, i: number) {

    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${ heroe.name }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true

    }).then( resp => {
      // sweet alert devuelve una promesa con el valor del botón que el usuario selecciona entonces
      // se verifica 
      if( resp.value) {
        this.heroesService.deleteHeroe( heroe.id ).subscribe();
        this.heroes.splice(i, 1);
      }
    });
    
  }

}
