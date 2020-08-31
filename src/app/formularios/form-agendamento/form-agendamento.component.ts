import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { defineLocale, listLocales } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
//import { CampoControlErroComponent } from '../../func/campo-control-erro/campo-control-erro.component';

import { UtilitariosService } from '../utilitarios.service';
import { PacienteService } from '../../services/paciente.service';
import { ProntuarioService } from '../../services/prontuario.service';
import { AgendamentoService } from '../../services/agendamento.service';
import { ProfissionalService } from '../../services/profissional.service';

import { Paciente } from '../../models/paciente';
import { Prontuario } from '../../models/prontuario';
import { Agendamento } from '../../models/agendamento';
import { Profissional } from '../../models/profissional';

@Component({
  selector: 'app-form-agendamento',
  templateUrl: './form-agendamento.component.html'
})
export class FormAgendamentoComponent implements OnInit, OnDestroy {  
  @Input() title;
  @Input() id: string;
  agendamentoForm: FormGroup;
  agendamento: Agendamento;
  agendamentoCancelado: boolean = false;
  paciente: Paciente;
  medico: Profissional;
  listaProntuarios: Paciente[];
  listaProfissionais: Profissional[];

  // conf BsDatepicker
  bsconfig = { 
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    minDate: new Date
  };

  tipos: any = [
    {
      value: 'Cirurgia',
      label: 'Cirurgia'
    },
    {
      value: 'Exame',
      label: 'Exame'
    }
  ];
  pacientes: any = [];
  medicos: any = [];
  prontuarios: any = [];
  crms: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentoService,
    private utilitariosService: UtilitariosService,
    private pacienteService: PacienteService,
    private prontuarioService: ProntuarioService,
    private profissionalService: ProfissionalService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal,
	) {
    // popular selects
    this.pacienteService.getPacientesNaoFalecidos().subscribe(data => {
      this.listaProntuarios = data;
      this.listaProntuarios.forEach(element => {
        this.prontuarios.push({
          value: element.prontuario.toString(),
          label: element.prontuario.toString()
        });
        this.pacientes.push({
          value: element.nome,
          label: element.nome
        });
      })   
    })
    this.profissionalService.getProfissionais().subscribe(data => {
      this.listaProfissionais = data;
      this.listaProfissionais.forEach(element => {
        this.medicos.push({
          value: element.nome,
          label: element.nome
        });
        this.crms.push({
          value: element.CRM,
          label: element.CRM
        });
      })
    })
  }

  ngOnInit() {
    // Form
    this.agendamentoForm = this.formBuilder.group({
      numProntuario: [null, Validators.required],
      nomePaciente: [null, Validators.required],
      crmMedico: [null, Validators.required],
      nomeMedico: [null, Validators.required],
      especialidade: [null, Validators.required],
      dataProcedimento: [null, Validators.required],
      tipo: [null, Validators.required],
      descricao: [null, Validators.required],
    });
    // Edit
    if (this.id !== null) {
      this.agendamentoService.getAgendamentoById(this.id).subscribe(data => {
        console.log(data);
        this.paciente = data.paciente;
        this.medico = data.medico;
        this.agendamentoForm.setValue({
          numProntuario: data.paciente.prontuario,
          nomePaciente: data.paciente.nome,
          crmMedico: data.medico.CRM,
          nomeMedico: data.medico.nome,
          especialidade: data.medico.especialidade,
          dataProcedimento: new Date(data.dataProcedimento),
          tipo: data.tipo,
          descricao: data.descricao
        });
        if (data.cancelado) {
          this.agendamentoCancelado = true;
          let controls = this.agendamentoForm.controls;
          controls.numProntuario.disable();
          controls.nomePaciente.disable();
          controls.crmMedico.disable();
          controls.nomeMedico.disable();
          controls.especialidade.disable();
          controls.dataProcedimento.disable();
          controls.tipo.disable();
          controls.descricao.disable();
          this.toastr.warning('Agendamento cancelado não é possível editar.')
        }
      })
    }

    // desabilita campo para não ser preenchido manualmente
    this.agendamentoForm.controls.especialidade.disable();    
  }

  onSelected(evento, tipo) {
    let controls = this.agendamentoForm.controls;
    console.log("tipo ", tipo, " evento ", evento);
    switch (tipo) {
      case 'prontuario':
        console.log("lista ",this.listaProntuarios);
        
        this.paciente = this.listaProntuarios.find(x => x.prontuario === evento.value);
        console.log("this.paciente", this.paciente);
        
        controls.numProntuario.setValue(this.paciente.prontuario);
        controls.nomePaciente.setValue(this.paciente.nome);
        break;
      case 'paciente':
        this.paciente = this.listaProntuarios.find(x => x.nome === evento.value);
        controls.numProntuario.setValue(this.paciente.prontuario);
        controls.nomePaciente.setValue(this.paciente.nome);
        break;
      case 'crm':
        this.medico = this.listaProfissionais.find(x => x.CRM === evento.value);
        controls.crmMedico.setValue(this.medico.CRM);
        controls.nomeMedico.setValue(this.medico.nome);
        controls.especialidade.setValue(this.medico.especialidade);
        break;
      case 'medico':
        this.medico = this.listaProfissionais.find(x => x.nome === evento.value);
        controls.crmMedico.setValue(this.medico.CRM);
        controls.nomeMedico.setValue(this.medico.nome);
        controls.especialidade.setValue(this.medico.especialidade);
        break;
    
      default:
        break;
    }    
  }

  closeModal() {
    this.activeModal.close(true);
  }

  save() {
    console.log(this.agendamentoForm.value);    
    if (this.agendamentoForm.valid) {
      console.log(this.agendamentoForm.value);
      console.log("timestamp", (this.agendamentoForm.value['dataProcedimento']).getTime());
      
      this.agendamento = {
        prontuario: this.paciente.prontuario,
        paciente: this.paciente,
        nomePaciente: this.paciente.nome,
        tipo: this.agendamentoForm.value['tipo'],
        especialidade: this.medico.especialidade,
        nomeMedico: this.medico.nome,
        medico: this.medico,
        dataProcedimento: (this.agendamentoForm.value['dataProcedimento']).getTime(),
        descricao: this.agendamentoForm.value['descricao'],
        cancelado: false
      }
      let prontuario: Prontuario;
      new Promise((resolve, reject) => {
        this.prontuarioService.getProntuarioByNumero(this.paciente.prontuario).subscribe(result => {
          console.log("prontuario: ", result[0]);
          prontuario = result[0];
          resolve(prontuario);
        });
      }).then(res => {
        if (this.id !== null) {
          this.agendamentoService.update(this.agendamento, this.id);
          this.agendamento.id = this.id;
          let index = prontuario.agendamentos.findIndex(x => x.id === this.id);
          prontuario.agendamentos.splice(index,1);
          prontuario.agendamentos.push(this.agendamento);
          this.prontuarioService.update(prontuario, prontuario.id);
          this.activeModal.close('dados editados');
          // reseta o form
          this.agendamentoForm.reset();
        } else {
          this.agendamentoService.add(this.agendamento).then(result => {
            this.agendamento.id = result.id;
            prontuario.agendamentos.push(this.agendamento);            
            this.prontuarioService.update(prontuario, prontuario.id);
            this.activeModal.close('dados adicionados');
            this.agendamentoForm.reset();
          });
        }
      });
    } else {
      this.utilitariosService.verificaValidacoesForm(this.agendamentoForm);
    }
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.agendamentoForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.agendamentoForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.agendamentoForm)
  }

  ngOnDestroy() {
    // reseta o form
    this.agendamentoForm.reset();
  }

}
