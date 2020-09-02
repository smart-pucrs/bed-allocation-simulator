import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Prontuario } from '../models/prontuario';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {
  prontuariosCollection: AngularFirestoreCollection<Prontuario>;
  prontuariosCollectionNaoFalecidos: AngularFirestoreCollection<Prontuario>;
  prontuariosCollectionInternados: AngularFirestoreCollection<Prontuario>;
  prontuariosCollectionAutorizados: AngularFirestoreCollection<Prontuario>;
  
  prontuarios: Observable<Prontuario[]>;
  prontuariosNaoFalecidos: Observable<Prontuario[]>;
  prontuariosInternados: Observable<Prontuario[]>;
  prontuariosAutorizados: Observable<Prontuario[]>;
  
  prontuarioDoc: AngularFirestoreDocument<Prontuario>;
  proximoProntuarioDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore) {
    this.prontuariosCollection = this.afs.collection('prontuarios');
    this.prontuariosCollectionNaoFalecidos = this.afs.collection('prontuarios', ref => ref.where('falecido', '==' , false));
    this.prontuariosCollectionInternados = this.afs.collection('prontuarios', ref => ref.where('consultasMedicas.internado', '==' , 'true'));
    this.prontuariosCollectionAutorizados = this.afs.collection('prontuarios', ref => ref.where('consultasMedicas.internar', '==' , 'true').where('consultasMedicas.internado', '==' , 'false'));
  
    this.getProntuariosDb();
    this.getProntuariosNaoFalecidosDb();
    this.getProntuariosInternadosDb();
    this.getProntuariosAutorizadosDb();
   }

  private getProntuariosDb(){
    this.prontuarios = this.prontuariosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Prontuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getProntuariosNaoFalecidosDb(){
    this.prontuariosNaoFalecidos = this.prontuariosCollectionNaoFalecidos.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Prontuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getProntuariosInternadosDb(){
    this.prontuariosInternados = this.prontuariosCollectionInternados.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Prontuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getProntuariosAutorizadosDb(){
    this.prontuariosAutorizados = this.prontuariosCollectionAutorizados.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Prontuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getProntuarios() {
    this.getProntuariosDb();
    return this.prontuarios;
  }

  getProntuariosNaoFalecidos() {
    this.getProntuariosNaoFalecidosDb();
    return this.prontuariosNaoFalecidos;
  }

  getProntuariosInternados() {
    this.getProntuariosInternadosDb();
    return this.prontuariosInternados;
  }

  getProntuariosAutorizados() {
    this.getProntuariosAutorizadosDb();
    return this.prontuariosAutorizados;
  }

  getProntuarioById(id: string) {
    this.prontuarioDoc = this.afs.doc(`prontuarios/${id}`);
    return this.prontuarioDoc.valueChanges();
  }

  getProntuarioByNumero(num: string) {
    return this.afs.collection('prontuarios', ref => ref.where('prontuario', '==' , num)).snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Prontuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  update(prontuario: Prontuario, id: string) {
    this.prontuarioDoc = this.afs.doc(`prontuarios/${id}`);
    this.prontuarioDoc.update(prontuario);
  }

  add(prontuario: Prontuario) {
    this.prontuariosCollection.add(prontuario);
  }

  delete(id: string) {
    this.prontuarioDoc = this.afs.doc(`prontuarios/${id}`);
    this.prontuarioDoc.delete();
  }

  incrementaProntuario() {
    let id = 'GNIZcMCxJ8zajwf575dT';
    this.proximoProntuarioDoc = this.afs.doc(`incrementaProntuario/${id}`);
    return this.proximoProntuarioDoc.valueChanges(); 
  }

  updateIncrementaProntuario(val: number){
    let id = 'GNIZcMCxJ8zajwf575dT';
    this.proximoProntuarioDoc = this.afs.doc(`incrementaProntuario/${id}`);
    this.proximoProntuarioDoc.update({proximo: val});
  }
  
}
