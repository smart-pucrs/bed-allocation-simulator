import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { OptimiserResult } from 'app/models/optimiser-result';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OptimiserResultService {
  optimiserResultCollection: AngularFirestoreCollection<OptimiserResult>;
  
  optimiserResult: Observable<OptimiserResult[]>;
  
  optimiserResultDoc: AngularFirestoreDocument<OptimiserResult>;

  constructor(public afs: AngularFirestore) {
    this.optimiserResultCollection = this.afs.collection('optimiserResult');
	  this.getOptimiserResultsDb();
  }

  private getOptimiserResultsDb(){
    this.optimiserResult = this.optimiserResultCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as OptimiserResult;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getOptimiserResults() {
    this.getOptimiserResultsDb();
    return this.optimiserResult;
  }

  getOptimiserResultById(id: string) {
    this.optimiserResultDoc = this.afs.doc(`optimiserResult/${id}`);
    return this.optimiserResultDoc.valueChanges();    
  }

  update(optimiserResult: OptimiserResult, id: string) {
    this.optimiserResultDoc = this.afs.doc(`optimiserResult/${id}`);
    this.optimiserResultDoc.update(optimiserResult);
  }

  add(optimiserResult: OptimiserResult) {
    this.optimiserResultCollection.add(optimiserResult);
  }

  delete(id: string) {
    this.optimiserResultDoc = this.afs.doc(`optimiserResult/${id}`);
    this.optimiserResultDoc.delete();
  }
}
