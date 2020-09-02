import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { UtilitariosService } from '../utilitarios.service';
import { PacienteService } from '../../services/paciente.service';

import { Leito } from '../../models/leito';
import { Prontuario } from '../../models/prontuario';
import { ConsultaMedica } from '../../models/consulta-medica';

@Component({
  selector: 'app-form-situacao-leitos',
  templateUrl: './form-situacao-leitos.component.html'
})
export class FormSituacaoLeitosComponent implements OnInit, OnDestroy {
  @Input() title;
  @Input() id: string;
  alocacaoForm: FormGroup;
  leito: Leito;
  paciente: Prontuario;
  consultaMedica: ConsultaMedica;
  listaProntuarios: Prontuario[];
  pacientes: any = [];
  prontuarios: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private utilitariosService: UtilitariosService,
    private pacienteService: PacienteService,
    public activeModal: NgbActiveModal,
	) {
    this.pacienteService.getPacientesAutorizados().subscribe(data => {
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
   }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close(true);
  }

  ngOnDestroy() {
    this.alocacaoForm.reset();
  }


}
