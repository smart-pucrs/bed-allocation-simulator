import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Leito } from '../models/leito';

@Injectable({
  providedIn: 'root'
})
export class LeitoService {
  leitos: Observable<Leito[]>;
  leitosDisponiveis: Observable<Leito[]>;

  constructor() { }

  getLeitos() {
    this.getLeitosDb();
    return this.leitos;
  }

  getLeitosDisponiveis() {
    this.getLeitosDisponiveisDb();
    return this.leitosDisponiveis;
  }

  add(leito: Leito) {
    return this.leitosCollection.add(leito);
  }
}
