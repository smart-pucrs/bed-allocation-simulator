import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';

import { DetalhesComponent } from '../../../../shared/detalhes/detalhes.component';
import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';
import { FormAgendamentoComponent } from '../../../../formularios/form-agendamento/form-agendamento.component';

import { ProntuarioService } from '../../../../services/prontuario.service';
import { AgendamentoService } from '../../../../services/agendamento.service';

import { Prontuario } from '../../../../models/prontuario';
import { Agendamento } from '../../../../models/agendamento';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html'
})
export class AgendamentosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Agendamentos';
  public data: Array<any>;  
  public title = 'Adicionar Agendamento';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  private numProntuario: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: '' },
    { title: 'Paciente', name: 'nomePaciente', sort: '' },
    { title: 'Médico', name: 'nomeMedico', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo de Procedimento', name: 'tipo', sort: '' },
    { title: 'Data', name: 'dataProcedimento', sort: 'desc' }
  ];

  constructor(
    private toastr: ToastrService, 
    private agendamentoService: AgendamentoService, 
    private prontuarioService: ProntuarioService,
    private modalService: NgbModal
  ) {
    this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
      this.data = agendamentos;
      this.data.forEach(element => {
        element.dataProcedimento = moment(element.dataProcedimento).format('DD/MM/YYYY');
      })
    });
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(FormAgendamentoComponent,{ size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.id = this.currentId;
    modalRef.result.then((result) => {
      if (result === 'dados editados'){
        this.toastr.success('Dados editados com sucesso!');
      } else {
        this.toastr.success('Dados inseridos com sucesso!');
      }
    }).catch((error) => {
      this.currentId = null;
    });
  }

  openAlert() {
    const modalRef = this.modalService.open(AppAlertComponent,{ size: 'sm' });
    modalRef.componentInstance.mensagem = this.mensagem;
    modalRef.result.then((result) => {
      this.agendamentoService.cancelarAgendamento(this.idToDelete);
      // let prontuario: Prontuario;
      let agendamento: Agendamento;
      this.agendamentoService.getAgendamentoById(this.idToDelete).subscribe(result => {
        agendamento = result;
        agendamento.cancelado = true;
        this.agendamentoService.update(agendamento, this.idToDelete);
      
      
      // new Promise((resolve, reject) => {
      //   this.prontuarioService.getProntuarioByNumero(this.numProntuario).subscribe(result => {
      //     prontuario = result[0];
      //     resolve(prontuario);
      //   });
      // }).then(res => {
      //     let agendamento: Agendamento;
      //     this.agendamentoService.getAgendamentoById(this.idToDelete).subscribe(result => {
      //       agendamento = result;
      //       agendamento.id = this.idToDelete;          
      //       let index = prontuario.agendamentos.findIndex(x => x === this.idToDelete);
      //       prontuario.agendamentos.splice(index,1);
      //       prontuario.agendamentos.push(agendamento);
      //       this.prontuarioService.update(prontuario, prontuario.id);
      //       this.idToDelete = null;
      //     });
      });
      const mensagem = 'Agendamento cancelado com sucesso!';
      this.toastr.success(mensagem);
    }).catch((error) => {
      this.idToDelete = null;
    });
  }

  onDelete(evento) {
    this.idToDelete = evento.id;
    this.numProntuario = evento.prontuario;
    this.mensagem = 'Deseja realmente cancelar o agendamento?';
    this.openAlert();
  }

  onAdd(evento) {
    this.currentId = null;
    this.title = 'Adicionar Agendamento';
    this.openModal();
  }

  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Data', value: evento.dataProcedimento, tipo: 'string'},
      { label: 'Prontuario', value: evento.paciente.prontuario, tipo: 'string'},
      { label: 'Cartão SUS', value: evento.paciente.cartaoSus, tipo: 'string'},
      { label: 'Paciente', value: evento.nomePaciente, tipo: 'string'},
      { label: 'Gênero', value: evento.paciente.genero, tipo: 'string'},
      { label: 'Data de nascimento', value: new Date(evento.paciente.nascimento), tipo: 'date'},
      { label: 'CPF', value: evento.paciente.cpf, tipo: 'string'},
      { label: 'Médico', value: evento.nomeMedico, tipo: 'string'},
      { label: 'CRM', value: evento.medico.CRM, tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string'},
      { label: 'Tipo de Procedimento', value: evento.tipo, tipo: 'string'},
      { label: 'Descrição', value: evento.descricao, tipo: 'string'},
    ];
    const modalRef = this.modalService.open(DetalhesComponent,{ size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Agendamento';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Agendamento';
    this.openModal();
  }

}
