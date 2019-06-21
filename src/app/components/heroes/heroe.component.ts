import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel"
  }

  nuevo: boolean = false;
  idFireBase: any;
  id: string;

  constructor(private _heroesService: HeroesService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      this.id = parametros['id'];
      if (this.id !== "nuevo") {
        this._heroesService.getHeroe(this.id)
          .subscribe((heroe: Heroe) => this.heroe = heroe);
      }
    });
  }

  ngOnInit() {
  }

  guardar() {
    console.log(this.heroe);

    if (this.id === "nuevo") {
      // Insertando
      this._heroesService.nuevoHeroe(this.heroe)
        .subscribe((data) => {
          this.idFireBase = data;
          this.idFireBase = this.idFireBase.name;
          this.router.navigate(['/heroe', this.idFireBase]);
        },
          error => console.log(error));
    } else {
      // Actualizando
      this._heroesService.actualizarHeroe(this.heroe, this.id)
        .subscribe((data) => {
          console.log(data);
        },
          error => console.log(error));
    }
  }

  agregarNuevo(forma: NgForm) {
    this.router.navigate(['/heroe', 'nuevo']);
    forma.reset({
      casa: "Marvel"
    });
  }

}
