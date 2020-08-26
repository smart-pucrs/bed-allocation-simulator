import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { ConsultaMedica } from '../models/consulta-medica';

@Injectable({
  providedIn: 'root'
})
export class ConsultaMedicaService {
  consultasMedicasCollection: AngularFirestoreCollection<ConsultaMedica>;
  
  consultasMedicas: Observable<ConsultaMedica[]>;
  
  consultaMedicaDoc: AngularFirestoreDocument<ConsultaMedica>;

  constructor(public afs: AngularFirestore) {
    this.consultasMedicasCollection = this.afs.collection('consultasMedicas');
	
    this.getConsultasMedicasDb();
   }

   private getConsultasMedicasDb(){
    this.consultasMedicas = this.consultasMedicasCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as ConsultaMedica;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getConsultasMedicas() {
    this.getConsultasMedicasDb();
    return this.consultasMedicas;
  }

  getConsultaMedicaById(id: string) {
    this.consultaMedicaDoc = this.afs.doc(`consultasMedicas/${id}`);
    return this.consultaMedicaDoc.valueChanges();    
  }

  update(consultaMedica: ConsultaMedica, id: string) {
    this.consultaMedicaDoc = this.afs.doc(`consultasMedicas/${id}`);
    this.consultaMedicaDoc.update(consultaMedica);
  }

  add(consultaMedica: ConsultaMedica) {
    return this.consultasMedicasCollection.add(consultaMedica);
  }

  delete(id: string) {
    this.consultaMedicaDoc = this.afs.doc(`consultasMedicas/${id}`);
    this.consultaMedicaDoc.delete();
  }
  
}
