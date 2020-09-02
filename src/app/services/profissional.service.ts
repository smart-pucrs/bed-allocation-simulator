import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Profissional } from '../models/profissional';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {
  profissionaisCollection: AngularFirestoreCollection<Profissional>;
  
  profissionais: Observable<Profissional[]>;
  
  profissionalDoc: AngularFirestoreDocument<Profissional>;

  constructor(public afs: AngularFirestore) {
    this.profissionaisCollection = this.afs.collection('profissionais');
	
    this.getProfissionaisDb();
   }

  private getProfissionaisDb(){
    this.profissionais = this.profissionaisCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Profissional;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getProfissionais() {
    this.getProfissionaisDb();
    return this.profissionais;
  }

  getProfissionalById(id: string) {
    this.profissionalDoc = this.afs.doc(`profissionais/${id}`);
    return this.profissionalDoc.valueChanges();    
  }

  update(profissional: Profissional, id: string) {
    this.profissionalDoc = this.afs.doc(`profissionais/${id}`);
    this.profissionalDoc.update(profissional);
  }

  add(profissional: Profissional) {
    this.profissionaisCollection.add(profissional);
  }

  delete(id: string) {
    this.profissionalDoc = this.afs.doc(`profissionais/${id}`);
    this.profissionalDoc.delete();
  }
  
}
