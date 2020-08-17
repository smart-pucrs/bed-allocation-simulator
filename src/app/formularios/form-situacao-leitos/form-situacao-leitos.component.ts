import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Leito } from '../../models/leito';
import { Prontuario } from '../../models/prontuario';
import { ConsultaMedica } from '../..models/consulta-medica';

import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-form-situacao-leitos',
  templateUrl: './form-situacao-leitos.component.html',
  styleUrls: ['./form-situacao-leitos.component.scss']
})
export class FormSituacaoLeitosComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  alocacaoForm: FormGroup;
  leito: Leito;
  paciente: Prontuario;
  consultaMedica: ConsultaMedica;
  listaProntuarios: Prontuario[];
  pacientes: any = [];
  prontuarios: any = [];

  constructor(private pacienteService: PacienteService) {
	this.pacienteService.getPacientesAutorizados().subscribe(data => {
      console.log("Autorizados ", data);
      this.listaProntuarios = data;
      this.listaProntuarios.forEach(element => {
        this.prontuarios.push({
          value: element.prontuario,
          label: element.prontuario
        });
        this.pacientes.push({
          value: element.nome,
          label: element.nome
        });
      })   
    })
	
	this.pacienteService.getPacientesInternados().subscribe(data => {
      console.log("Internados ", data);
    })
  }

  ngOnInit(): void {
  }

}
