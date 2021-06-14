import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { TempAloc } from '../models/temp-aloc';

@Injectable({
  providedIn: 'root'
})
export class TempAlocService {
  tempAlocCollection: AngularFirestoreCollection<TempAloc>;
  
  tempAloc: Observable<TempAloc[]>;
  
  tempAlocDoc: AngularFirestoreDocument<TempAloc>;

  constructor(public afs: AngularFirestore) {
    this.tempAlocCollection = this.afs.collection('tempAloc');
	  this.getTempAlocsDb();
  }

  private getTempAlocsDb(){
    this.tempAloc = this.tempAlocCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as TempAloc;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getTempAlocs() {
    this.getTempAlocsDb();
    return this.tempAloc;
  }

  getTempAlocById(id: string) {
    this.tempAlocDoc = this.afs.doc(`tempAloc/${id}`);
    return this.tempAlocDoc.valueChanges();    
  }

  update(tempAloc: TempAloc, id: string) {
    this.tempAlocDoc = this.afs.doc(`tempAloc/${id}`);
    this.tempAlocDoc.update(tempAloc);
  }

  add(tempAloc: TempAloc) {
    this.tempAlocCollection.add(tempAloc);
  }

  delete(id: string) {
    this.tempAlocDoc = this.afs.doc(`tempAloc/${id}`);
    this.tempAlocDoc.delete();
  }
}
