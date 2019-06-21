import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Heroe } from "../interfaces/heroe.interface";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroesURL: string = "https://heroesapp-d5304.firebaseio.com/heroes.json";
  heroeURL: string = "https://heroesapp-d5304.firebaseio.com/heroes/";

  constructor(private http: HttpClient) { }

  // Agregar nuevo héroe
  nuevoHeroe(heroe: Heroe) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.heroesURL, body, { headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  // Actualizar héroe
  actualizarHeroe(heroe: Heroe, key$: string) {
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    let url = `${this.heroeURL}/${key$}.json`;

    return this.http.put(url, body, { headers })
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  // Obtiene un héroe por su id
  getHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  // Obtiene todos los héroes
  getHeroes() {
    return this.http.get(this.heroesURL)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }

  // Borra un héroe por su id
  borrarHeroe(key$: string) {
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}
