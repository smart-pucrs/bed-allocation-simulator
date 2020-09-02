import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Agendamento } from '../models/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  agendamentosCollection: AngularFirestoreCollection<Agendamento>;
  
  agendamentos: Observable<Agendamento[]>;
  
  agendamentoDoc: AngularFirestoreDocument<Agendamento>;

  constructor(public afs: AngularFirestore) {
    this.agendamentosCollection = this.afs.collection('agendamentos');
	
    this.getAgendamentosDb();
   }

   private getAgendamentosDb(){
    this.agendamentos = this.agendamentosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Agendamento;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getAgendamentos() {
    this.getAgendamentosDb();
    return this.agendamentos;
  }

  getAgendamentoById(id: string) {
    this.agendamentoDoc = this.afs.doc(`agendamentos/${id}`);
    return this.agendamentoDoc.valueChanges();    
  }

  update(agendamento: Agendamento, id: string) {
    this.agendamentoDoc = this.afs.doc(`agendamentos/${id}`);
    this.agendamentoDoc.update(agendamento);
  }

  add(agendamento: Agendamento) {
    return this.agendamentosCollection.add(agendamento);
  }

  delete(id: string) {
    this.agendamentoDoc = this.afs.doc(`agendamentos/${id}`);
    this.agendamentoDoc.delete();
  }

  cancelarAgendamento(id: string) {
    this.agendamentoDoc = this.afs.doc(`agendamentos/${id}`);
    this.agendamentoDoc.update({cancelado: true});
  }
  
}
