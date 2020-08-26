import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

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
	
    this.getLeitosDb();
    this.getLeitosDisponiveisDb();
   }

  private getLeitosDb(){
    this.leitos = this.leitosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Leito;
        data.id = a.payload.doc.id;        
        return data;
      });
    }));
  }

  private getLeitosDisponiveisDb(){
    this.leitosDisponiveis = this.leitosDisponiveisCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Leito;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getLeitos() {
    this.getLeitosDb();
    return this.leitos;
  }

  getLeitoByNumero(num: string) {
    return this.afs.collection('leitos', ref => ref.where('numero', '==' , num)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Leito;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getLeitosDisponiveis() {
    this.getLeitosDisponiveisDb();
    return this.leitosDisponiveis;
  }

  getLeitoById(id: string) {
    this.leitoDoc = this.afs.doc(`leitos/${id}`);
    return this.leitoDoc.valueChanges();    
  }

  update(leito: Leito, id: string) {
    this.leitoDoc = this.afs.doc(`leitos/${id}`);
    return this.leitoDoc.update(leito);
  }

  add(leito: Leito) {
    return this.leitosCollection.add(leito);
  }

  delete(id: string) {
    this.leitoDoc = this.afs.doc(`leitos/${id}`);
    this.leitoDoc.delete();
  }
}
