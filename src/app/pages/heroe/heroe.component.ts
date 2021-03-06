import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute ) { 

  }

  ngOnInit() {
    // otra manera de subscribirse para obtener el parámetro
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo') {
      this.heroesService.getHeroe( id )
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id;
        });
    }
  }

  guardar(form: NgForm) {

    if ( form.invalid ) {
      return;
    }
    
    Swal.fire({
      title: 'Wait',
      text: 'Saving data',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let request: Observable<any>;
    let action: string;
    if ( this.heroe.id ) {
      action = 'updated';
      request = this.heroesService.updateHeroe( this.heroe );
    } else {
      action = 'added';
      request = this.heroesService.addHeroe( this.heroe );
    }
    
    request.subscribe( resp => {
      Swal.fire({
        title: this.heroe.name,
        text: `Heroe ${ action } succesfully`,
        type: 'success'
      });
    });
    
  }

  

}
