import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Excecao } from '../models/excecao';

@Injectable({
  providedIn: 'root'
})
export class ExcecaoService {
  excecoesCollection: AngularFirestoreCollection<Excecao>;  
  excecoes: Observable<Excecao[]>;
  
  excecaoDoc: AngularFirestoreDocument<Excecao>;

  constructor(public afs: AngularFirestore) {
    this.excecoesCollection = this.afs.collection('excecoes');
	
    this.getExcecoesDb();
   }

  private getExcecoesDb(){
    this.excecoes = this.excecoesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Excecao;
        //data.id = a.payload.doc.id;       
        return data;
      });
    }));
  }

  getExcecoes() {
    this.getExcecoesDb();
    return this.excecoes;
  }

  getExcecaoByQuarto(quarto: string) {
    this.excecaoDoc = this.afs.doc(`excecoes/${quarto}`);
    return this.excecaoDoc.valueChanges();  
  }

  write(excecao: Excecao, quarto: string) {
    this.excecaoDoc = this.afs.doc(`excecoes/${quarto}`);
    return this.excecaoDoc.set(excecao);
  }

/*  add(leito: Leito) {
    return this.leitosCollection.add(leito);
  }
*/
  delete(id: string) {
    this.excecaoDoc = this.afs.doc(`excecoes/${id}`);
    this.excecaoDoc.delete();
  }

  deleteExcecaoByQuarto(quarto: string) {
    this.excecaoDoc = this.afs.doc(`excecoes/${quarto}`);
    console.log("service");
    console.log(this.excecaoDoc);
    
    return this.excecaoDoc.delete();
  }
}
