import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators'

import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuariosCollection: AngularFirestoreCollection<Usuario>;
  
  usuarios: Observable<Usuario[]>;
  
  usuarioDoc: AngularFirestoreDocument<Usuario>;

  constructor(public afs: AngularFirestore) {
    this.usuariosCollection = this.afs.collection('usuarios');
	
    this.getUsuariosDb();
  }

  private getUsuariosDb(){
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Usuario;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getUsuarios() {
    this.getUsuariosDb();
    return this.usuarios;
  }

  getUsuarioById(id: string) {
    this.usuarioDoc = this.afs.doc(`usuarios/${id}`);
    return this.usuarioDoc.valueChanges();    
  }

  update(usuario: Usuario, id: string) {
    this.usuarioDoc = this.afs.doc(`usuarios/${id}`);
    this.usuarioDoc.update(usuario);
  }

  add(usuario: Usuario) {
    this.usuariosCollection.add(usuario);
  }

  delete(id: string) {
    this.usuarioDoc = this.afs.doc(`usuarios/${id}`);
    this.usuarioDoc.delete();
  }

}
