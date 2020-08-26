import { Injectable } from '@angular/core';

import { AngularFireAuthModule } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  createUser(usuario: any) {
    console.log("Usuário: ", usuario);
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.password);        
  }

  forgotPassword(email: string) {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email);
  }

  onSignIn(usuario) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
  }
  
}
