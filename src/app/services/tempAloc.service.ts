import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Allocation } from '../models/allocation';
import { Validation } from '../models/validation';

@Injectable({
  providedIn: 'root'
})
export class TempAlocService {
  validationCollection: AngularFirestoreCollection<Validation>;  

  constructor(public afs: AngularFirestore) {
    this.validationCollection = this.afs.collection('tempAloc');
   }

  write(allocation: Allocation[]) {
	let validation: Validation = {validated: false, allocation: allocation}
	let doc = this.validationCollection.add(validation);
  }
}