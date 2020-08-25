import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

import { Leito } from '../models/leito';

@Injectable({
  providedIn: 'root'
})
export class LeitoService {
  leitosCollection: AngularFirestoreCollection<Leito>;
  leitosDisponiveisCollection: AngularFirestoreCollection<Leito>;
  leitos: Observable<Leito[]>;
  leitosDisponiveis: Observable<Leito[]>;
  leitoDoc: AngularFirestoreDocument<Leito>;

  constructor(public afs: AngularFirestore) {
    this.leitosCollection = this.afs.collection('leitos');
    this.leitosDisponiveisCollection = this.afs.collection('leitos', ref => ref.where('status', '==' , 'Livre'));
	
	this.leitos = this.leitosCollection.valueChanges() 
	this.leitosDisponiveis = this.leitosDisponiveisCollection.valueChanges() 
  }

  getLeitos() {
    return this.leitos;
  }

  getLeitosDisponiveis() {
    return this.leitosDisponiveis;
  }

  add(leito: Leito) {
    return this.leitosCollection.add(leito);
  }

  getLeitoById(id: string) {
    this.leitoDoc = this.afs.doc(`leitos/${id}`);
    return this.leitoDoc.valueChanges();    
  }
}
