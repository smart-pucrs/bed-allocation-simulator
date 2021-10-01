import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Validacao } from 'app/models/validacao';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ValidacoesService {
  validacoesCollection: AngularFirestoreCollection<Validacao>;
  
  validacoes: Observable<Validacao[]>;
  validacoesNaoConcluidas: Observable<Validacao[]>;
  
  validacoesDoc: AngularFirestoreDocument<Validacao>;

  constructor(public afs: AngularFirestore) {
    this.validacoesCollection = this.afs.collection('validacoes');
	  this.getValidacoesDb();
  }
  private getValidacoesDb(){
    this.validacoes = this.validacoesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Validacao;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getValidacoesNaoConcluidas(){
    this.validacoesNaoConcluidas = this.afs.collection('validacoes', ref => ref.where('concluido', '==' , false)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Validacao;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  setValidacaoConcluida(){
    let arrValidacoes: Validacao[];
    this.getValidacoesNaoConcluidas();
    this.validacoesNaoConcluidas.subscribe(validacoes => {
      arrValidacoes = validacoes;
      arrValidacoes.forEach(element =>{
        element.concluido = true;
        this.update(element, element.id);
      });
    });
  }

  update(validacoes: Validacao, id: string) {
    this.validacoesDoc = this.afs.doc(`validacoes/${id}`);
    this.validacoesDoc.update(validacoes);
  }
}
