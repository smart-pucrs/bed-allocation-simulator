import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { LaudoInternacao } from '../models/laudo-internacao';

@Injectable({
  providedIn: 'root'
})

export class LaudoInternacaoService {
  laudosCollection: AngularFirestoreCollection<LaudoInternacao>;
  laudosPendentesCollection: AngularFirestoreCollection<LaudoInternacao>;
  pacientesInternadosCollection: AngularFirestoreCollection<LaudoInternacao>;
  
  laudos: Observable<LaudoInternacao[]>;
  laudosPendentes: Observable<LaudoInternacao[]>;
  pacientesInternados: Observable<LaudoInternacao[]>;
  
  laudoDoc: AngularFirestoreDocument<LaudoInternacao>;

  constructor(public afs: AngularFirestore) {
    this.laudosCollection = this.afs.collection('laudosInternacao');
	//%PLACEHOLDER%
    //this.laudosPendentesCollection = this.afs.collection('laudosInternacao', ref => ref.where('ativo', '==' , true).where('internado', '==' , false));
    this.laudosPendentesCollection = this.afs.collection('tempAloc', ref => ref);
    this.pacientesInternadosCollection = this.afs.collection('laudosInternacao', ref => ref.where('ativo', '==' , true).where('internado', '==' , true));
	
    this.getLaudosDb();
  }

   private getLaudosDb(){
    this.laudos = this.laudosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LaudoInternacao;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getLaudosPendentesDb(){
    this.laudosPendentes = this.laudosPendentesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LaudoInternacao;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getpacientesInternadosDb(){
    this.pacientesInternados = this.pacientesInternadosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as LaudoInternacao;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getLaudos() {
    this.getLaudosDb();
    return this.laudos;
  }

  getLaudosPendentes() {
    this.getLaudosPendentesDb();
    return this.laudosPendentes;
  }

  getpacientesInternados() {
    this.getpacientesInternadosDb();
    return this.pacientesInternados;
  }

  getLaudoById(id: string) {
    this.laudoDoc = this.afs.doc(`laudosInternacao/${id}`);
    return this.laudoDoc.valueChanges();    
  }

  update(laudo: LaudoInternacao, id: string) {
    this.laudoDoc = this.afs.doc(`laudosInternacao/${id}`);
    this.laudoDoc.update(laudo);
  }

  add(laudo: LaudoInternacao) {
    return this.laudosCollection.add(laudo);
  }

  delete(id: string) {
    this.laudoDoc = this.afs.doc(`laudosInternacao/${id}`);
    this.laudoDoc.delete();
  }
}
