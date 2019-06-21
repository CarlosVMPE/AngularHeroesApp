import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";
import { Heroe } from 'src/app/interfaces/heroe.interface';

/**
 * https://firebase.google.com/docs/reference/rest/database?authuser=0
 */

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  loading: boolean = true;

  constructor(private _heroesService: HeroesService) {
    this._heroesService.getHeroes()
      .subscribe((data: Heroe[]) => {

        setTimeout(() => {
          this.loading = false;
          this.heroes = data;
        }, 1000);
      });
  }

  ngOnInit() {
  }

  borraHeroe(key$: string) {
    this._heroesService.borrarHeroe(key$)
      .subscribe(res => {
        if (res) {
          console.error(res);
        } else {
          // Todo bien
          // Si responde null entonces lo borró
          delete this.heroes[key$];
        }
      });
  }

}
