import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Quarto } from '../models/quarto';

@Injectable({
  providedIn: 'root'
})
export class InfraestruturaService {
  infraestruturaCollection: AngularFirestoreCollection<Quarto>;
  
  infraestrutura: Observable<Quarto[]>;
  
  quartoDoc: AngularFirestoreDocument<Quarto>;

  constructor(public afs: AngularFirestore) {
    this.infraestruturaCollection = this.afs.collection('infraestrutura');
	
    this.getInfraestruturaDb();
  }

  private getInfraestruturaDb(){
    this.infraestrutura = this.infraestruturaCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Quarto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getInfraestrutura() {
    this.getInfraestruturaDb();
    return this.infraestrutura;
  }

  getQuartoByNumero(num: string) {
    return this.afs.collection('infraestrutura', ref => ref.where('nome', '==' , num)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Quarto;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getQuartoById(id: string) {
    this.quartoDoc = this.afs.doc(`infraestrutura/${id}`);
    return this.quartoDoc.valueChanges();    
  }

  update(quarto: Quarto, id: string) {
    console.log("Quarto que será atualizado Infraestrutura service: ", quarto);
    
    this.quartoDoc = this.afs.doc(`infraestrutura/${id}`);
    this.quartoDoc.update(quarto);
  }

  add(quarto: Quarto) {
    this.infraestruturaCollection.add(quarto);
  }

  delete(id: string) {
    this.quartoDoc = this.afs.doc(`infraestrutura/${id}`);
    this.quartoDoc.delete();
  }
  
}
