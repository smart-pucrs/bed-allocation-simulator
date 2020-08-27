import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment-timezone';

import { LaudoInternacaoService } from '../../../services/laudo-internacao.service';

import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';
import { FormPacientesInternadosComponent } from '../../../formularios/form-pacientes-internados/form-pacientes-internados.component';


@Component({
  selector: 'app-pacientes-internados',
  templateUrl: './pacientes-internados.component.html'
})

export class PacientesInternadosComponent implements OnInit {
  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Pacientes Internados';
  public data: Array<any>;  
  public title = 'Internação';
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Leito', name: 'numLeito', sort: '' },
    { title: 'Data de Internação', name: 'dataInternacao', sort: '' }
  ];

  constructor(
	private laudoInternacaoService: LaudoInternacaoService,
    //private toastr: ToastrService,
    private modalService: NgbModal
	) {
    this.laudoInternacaoService.getpacientesInternados().subscribe(laudos => {
      this.data = laudos;
      this.data.forEach(element => {
        element.dataInternacao = moment(element.dataInternacao).format('DD/MM/YYYY');
        element.numLeito = element.leito.numero;
      });
	});
  }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(FormPacientesInternadosComponent,{ size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.id = this.currentId;
    modalRef.result.then((result) => {
      if (result === 'alta registrada'){
        //this.toastr.success('Alta registrada com sucesso!');
      }
    }).catch((error) => {
      this.currentId = null;
    });
  }

  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Prontuário', value: evento.prontuario,  tipo: 'string'},
      { label: 'Nome do Paciente', value: evento.nomePaciente,  tipo: 'string'},
      { label: 'Médico', value: evento.medicoResponsavel,  tipo: 'string'},
      { label: 'CRM', value: evento.crmMedico,  tipo: 'string'},
      { label: 'Gênero', value: evento.genero,  tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade,  tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Leito', value: evento.tipoDeLeito ? evento.tipoDeLeito : '', tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado ? evento.tipoDeCuidado : '', tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Ativo', value: evento.ativo ? 'Sim' : 'Não', tipo: 'string'},
      { label: 'Data da Internação', value: evento.dataInternacao ? evento.dataInternacao : '', tipo: 'string'},
      { label: 'Data da Alta', value: evento.dataAlta ? new Date(evento.dataAlta) : '', tipo: 'date'},
      { label: 'Leito', value: evento.leito ? evento.leito.numero : '', tipo: 'string'},      
    ];
	
    const modalRef = this.modalService.open(DetalhesComponent,{ size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo de Internação';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Internação';
    this.openModal();
  }
  
}
