import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {  
  pacientesCollection: AngularFirestoreCollection<Paciente>;
  pacientesCollectionNaoFalecidos: AngularFirestoreCollection<Paciente>;
  pacientesCollectionInternados: AngularFirestoreCollection<Paciente>;
  pacientesCollectionAutorizados: AngularFirestoreCollection<Paciente>;
  
  pacientes: Observable<Paciente[]>;
  pacientesNaoFalecidos: Observable<Paciente[]>;
  pacientesInternados: Observable<Paciente[]>;
  pacientesAutorizados: Observable<Paciente[]>;
  
  pacienteDoc: AngularFirestoreDocument<Paciente>;
  proximoPacienteDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore) {
    this.pacientesCollection = this.afs.collection('pacientes');
    this.pacientesCollectionNaoFalecidos = this.afs.collection('pacientes', ref => ref.where('falecido', '==' , false));
    this.pacientesCollectionInternados = this.afs.collection('pacientes', ref => ref.where('internado', '==' , 'true'));
    this.pacientesCollectionAutorizados = this.afs.collection('pacientes', ref => ref.where('internar', '==' , 'true').where('internado', '==' , 'false'));
  
    this.getPacientesDb();
    this.getPacientesNaoFalecidosDb();
    this.getPacientesInternadosDb();
    this.getPacientesAutorizadosDb();	
  }

  private getPacientesDb(){
    this.pacientes = this.pacientesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getPacientesNaoFalecidosDb(){
    this.pacientesNaoFalecidos = this.pacientesCollectionNaoFalecidos.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getPacientesInternadosDb(){
    this.pacientesInternados = this.pacientesCollectionInternados.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  private getPacientesAutorizadosDb(){
    this.pacientesAutorizados = this.pacientesCollectionAutorizados.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Paciente;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getPacientes() {
    this.getPacientesDb();
    return this.pacientes;
  }

  getPacientesNaoFalecidos() {
    this.getPacientesNaoFalecidosDb();
    return this.pacientesNaoFalecidos;
  }

  getPacientesInternados() {
    this.getPacientesInternadosDb();
    return this.pacientesInternados;
  }

  getPacientesAutorizados() {
    this.getPacientesAutorizadosDb();
    return this.pacientesAutorizados;
  }

  getPacienteById(id: string) {
    this.pacienteDoc = this.afs.doc(`pacientes/${id}`);
    return this.pacienteDoc.valueChanges();    
  }

  update(paciente: Paciente, id: string) {
    this.pacienteDoc = this.afs.doc(`pacientes/${id}`);
    return this.pacienteDoc.update(paciente);
  }

  add(paciente: Paciente) {
    return this.pacientesCollection.add(paciente);
  }

  delete(id: string) {
    this.pacienteDoc = this.afs.doc(`pacientes/${id}`);
    this.pacienteDoc.delete();
  }
  
}
