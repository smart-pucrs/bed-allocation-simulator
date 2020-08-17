import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  pacientes: Observable<Paciente[]>;
  pacientesNaoFalecidos: Observable<Paciente[]>;
  pacientesInternados: Observable<Paciente[]>;
  pacientesAutorizados: Observable<Paciente[]>;
  pacienteDoc: AngularFirestoreDocument<Paciente>;
  proximoPacienteDoc: AngularFirestoreDocument<any>;

  constructor() { }
  
  getPacientes() {
    //this.getPacientesDb();
    return this.pacientes;
  }

  getPacientesNaoFalecidos() {
    //this.getPacientesNaoFalecidosDb();
    return this.pacientesNaoFalecidos;
  }

  getPacientesInternados() {
    //this.getPacientesInternadosDb();
    return this.pacientesInternados;
  }

  getPacientesAutorizados() {
    //this.getPacientesAutorizadosDb();
    return this.pacientesAutorizados;
  }
}
