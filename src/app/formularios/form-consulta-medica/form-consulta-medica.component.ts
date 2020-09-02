import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { UtilitariosService } from '../utilitarios.service';
import { PacienteService } from '../../services/paciente.service';
import { ProntuarioService } from '../../services/prontuario.service';
import { ProfissionalService } from '../../services/profissional.service';
import { ConsultaMedicaService } from '../../services/consulta-medica.service';
import { LaudoInternacaoService } from '../../services/laudo-internacao.service';

import { Paciente } from '../../models/paciente';
import { Prontuario } from '../../models/prontuario';
import { Profissional } from '../../models/profissional';
import { TIPOSDEQUARTOS } from '../../models/tipos-quartos';
import { TIPOSDEESTADIA } from '../../models/tipos-estadia';
import { ConsultaMedica } from '../../models/consulta-medica';
import { TIPOSDECUIDADOS } from '../../models/tipos-cuidados';
import { LaudoInternacao } from '../../models/laudo-internacao';
import { TIPOSDEENCAMINHAMENTO } from '../../models/tipos-encaminhamento';

@Component({
  selector: 'app-form-consulta-medica',
  templateUrl: './form-consulta-medica.component.html',
})
export class FormConsultaMedicaComponent implements OnInit {
  @Input() title;
  @Input() id: string;
  consultaMedicaForm: FormGroup;
  consultaMedica: ConsultaMedica;
  paciente: Paciente;
  medicoResponsavel: Profissional;
  listaProntuarios: Paciente[];
  listaProfissionais: Profissional[];
  dataConsulta: number = new Date().getTime();
  internacaoJaAutorizada: boolean = false;

  // conf BsDatepicker
  bsconfig = {
    dateInputFormat: 'DD/MM/YYYY',
    containerClass: 'theme-default',
    minDate: new Date
  };

  tiposDeEncaminhamento: any = TIPOSDEENCAMINHAMENTO;
  confirmacao: any = [
    {
      value: 'true',
      label: 'Sim'
    },
    {
      value: 'false',
      label: 'Não'
    }
  ];
  tiposDeLeito: any = TIPOSDEQUARTOS;
  tiposDeCuidado: any = TIPOSDECUIDADOS;
  tiposDeEstadia: any = TIPOSDEESTADIA;
  pacientes: any = [];
  medicos: any = [];
  prontuarios: any = [];
  crms: any = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private utilitariosService: UtilitariosService,
    private laudoInternacaoService: LaudoInternacaoService,
    private consultaMedicaService: ConsultaMedicaService,
    private profissionalService: ProfissionalService,
    private prontuarioService: ProntuarioService,
    private pacienteService: PacienteService,
    ) {
    // popular selects
    this.pacienteService.getPacientesNaoFalecidos().subscribe(data => {
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
    this.consultaMedicaForm = this.formBuilder.group({
      numProntuario: [null, Validators.required],
      nomePaciente: [null, Validators.required],
      crmMedico: [null, Validators.required],
      nomeMedico: [null, Validators.required],
      especialidade: [null],
      tipoDeEncaminhamento: [null, Validators.required],
      diagnostico: [null, Validators.required],
      tratamento: [null, Validators.required],
      exames: [null],
      medicamentos: [null],
      internar: [null, Validators.required],
      tipoDeLeito: [null],
      tipoDeCuidado: [null],
      tipoDeEstadia: [null]
    });
    // Edit
    if (this.id !== null) {
      this.consultaMedicaService.getConsultaMedicaById(this.id).subscribe(data => {
        this.paciente = data.paciente;
        this.dataConsulta = data.dataConsulta;
        this.medicoResponsavel = data.medicoResponsavel;
        this.internacaoJaAutorizada = data.internar == 'true' ? true : false;
        this.consultaMedicaForm.setValue({
          numProntuario: data.paciente.prontuario,
          nomePaciente: data.paciente.nome,
          crmMedico: data.medicoResponsavel.CRM,
          nomeMedico: data.medicoResponsavel.nome,
          especialidade: data.medicoResponsavel.especialidade,
          tipoDeEncaminhamento: data.tipoDeEncaminhamento,
          diagnostico: data.diagnostico,
          tratamento: data.tratamento,
          exames: data.exames ? data.exames : '',
          medicamentos: data.medicamentos ? data.medicamentos : '',
          internar: data.internar,
          tipoDeLeito: data.tipoDeLeito ? data.tipoDeLeito : '',
          tipoDeCuidado: data.tipoDeCuidado ? data.tipoDeCuidado : '',
          tipoDeEstadia: data.tipoDeEstadia ? data.tipoDeEstadia : ''
        });
      })
    }

    // desabilita campo para não ser preenchido manualmente
    this.consultaMedicaForm.controls.especialidade.disable();
  }
  
  onSelected(evento, tipo) {
    let controls = this.consultaMedicaForm.controls;
    switch (tipo) {
      case 'prontuario':
        this.paciente = this.listaProntuarios.find(x => x.prontuario === evento.value);
        controls.numProntuario.setValue(this.paciente.prontuario);
        controls.nomePaciente.setValue(this.paciente.nome);
        break;
      case 'paciente':
        this.paciente = this.listaProntuarios.find(x => x.nome === evento.value);
        controls.numProntuario.setValue(this.paciente.prontuario);
        controls.nomePaciente.setValue(this.paciente.nome);
        break;
      case 'crm':
        this.medicoResponsavel = this.listaProfissionais.find(x => x.CRM === evento.value);
        controls.crmMedico.setValue(this.medicoResponsavel.CRM);
        controls.nomeMedico.setValue(this.medicoResponsavel.nome);
        controls.especialidade.setValue(this.medicoResponsavel.especialidade);
        break;
      case 'medico':
        this.medicoResponsavel = this.listaProfissionais.find(x => x.nome === evento.value);
        controls.crmMedico.setValue(this.medicoResponsavel.CRM);
        controls.nomeMedico.setValue(this.medicoResponsavel.nome);
        controls.especialidade.setValue(this.medicoResponsavel.especialidade);
        break;

      default:
        break;
    }
  }

  closeModal() {
    this.activeModal.close(true);
  }

  save() {
    if (this.consultaMedicaForm.valid) {
      this.consultaMedica = {
        dataConsulta: this.dataConsulta,
        prontuario: this.paciente.prontuario,
        paciente: this.paciente,
        especialidade: this.medicoResponsavel.especialidade,
        medicoResponsavel: this.medicoResponsavel,
        tipoDeEncaminhamento: this.consultaMedicaForm.value['tipoDeEncaminhamento'],
        diagnostico: this.consultaMedicaForm.value['diagnostico'],
        tratamento: this.consultaMedicaForm.value['tratamento'],
        exames: this.consultaMedicaForm.value['exames'],
        medicamentos: this.consultaMedicaForm.value['medicamentos'],
        internar: this.consultaMedicaForm.value['internar'],
        tipoDeLeito: this.consultaMedicaForm.value['tipoDeLeito'],
        tipoDeCuidado: this.consultaMedicaForm.value['tipoDeCuidado'],
        tipoDeEstadia: this.consultaMedicaForm.value['tipoDeEstadia'],
      }
      let prontuario: Prontuario;
      new Promise((resolve, reject) => {
        this.prontuarioService.getProntuarioByNumero(this.paciente.prontuario).subscribe(result => {
          prontuario = result[0];
          resolve(prontuario);
        });
      }).then(res => {
        if (this.consultaMedica.internar == 'true') {
            let age: string;
            let d = new Date;

            let ano_atual = d.getFullYear();
            let mes_atual = d.getMonth() + 1;
            let dia_atual = d.getDate();

            let data_aniversario = new Date(prontuario.paciente.nascimento);

            let ano_aniversario = data_aniversario.getFullYear();
            let mes_aniversario = data_aniversario.getMonth() + 1;
            let dia_aniversario = data_aniversario.getDate();

            let idade = ano_atual - ano_aniversario;

            if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
              idade--;
            }
			
            if (idade > 18) {
              age = 'Adulto'
            } else if (idade > 12) {
              age = 'Adolescente'
            } else {
              age = 'Criança'
            }
            let laudoInternacao: LaudoInternacao = {
              prontuario: prontuario.prontuario,
              ativo: true,
              nomePaciente: prontuario.paciente.nome,
              idPaciente: prontuario.idPaciente,
              genero: prontuario.paciente.genero,
              age: age,
              crmMedico: this.consultaMedica.medicoResponsavel.CRM,
              medicoResponsavel: this.consultaMedica.medicoResponsavel.nome,
              especialidade: this.consultaMedica.medicoResponsavel.especialidade,
              tipoDeLeito: this.consultaMedica.tipoDeLeito,
              tipoDeEncaminhamento: this.consultaMedica.tipoDeEncaminhamento,
              tipoDeCuidado: this.consultaMedica.tipoDeCuidado,
              tipoDeEstadia: this.consultaMedica.tipoDeEstadia,
              internado: false
            };
            if (this.internacaoJaAutorizada) {
              this.saveDb(prontuario);
            } else {
            this.laudoInternacaoService.add(laudoInternacao).then(result => {
              laudoInternacao.id = result.id
              prontuario.internacoes.push(laudoInternacao);
              this.saveDb(prontuario);
            })
          }
        } else {
          this.saveDb(prontuario);
        }
      });
    } else {
      this.utilitariosService.verificaValidacoesForm(this.consultaMedicaForm);
    }
  }

  saveDb(prontuario) {
    if (this.id !== null) {
      this.consultaMedicaService.update(this.consultaMedica, this.id);
      this.consultaMedica.id = this.id;
      let index = prontuario.consultasMedicas.findIndex(x => x.id === this.id);
      prontuario.consultasMedicas.splice(index, 1);
      prontuario.consultasMedicas.push(this.consultaMedica);
      this.pacienteService.update(prontuario.paciente, prontuario.idPaciente);
      this.prontuarioService.update(prontuario, prontuario.id);
      this.activeModal.close('dados editados');
      // reseta o form
      this.consultaMedicaForm.reset();
    } else {
      this.consultaMedicaService.add(this.consultaMedica).then(result => {
        this.consultaMedica.id = result.id;
        prontuario.consultasMedicas.push(this.consultaMedica);
        this.pacienteService.update(prontuario.paciente, prontuario.idPaciente);
        this.prontuarioService.update(prontuario, prontuario.id);
        this.activeModal.close('dados adicionados');
        this.consultaMedicaForm.reset();
      });
    }
  }

  verificaValidTouched(campo: string) {
    return this.utilitariosService.verificaValidTouched(campo, this.consultaMedicaForm);
  }

  aplicaCssErro(campo: string) {
    return this.utilitariosService.aplicaCssErro(campo, this.consultaMedicaForm)
  }

  getMsgError(campo: string) {
    return this.utilitariosService.getMsgError(campo, this.consultaMedicaForm)
  }

  ngOnDestroy() {
    // reseta o form
    this.consultaMedicaForm.reset();
  }
  
}
