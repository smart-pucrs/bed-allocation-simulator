import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment-timezone';

import { DetalhesComponent } from '../../../../shared/detalhes/detalhes.component';
import { AppAlertComponent } from '../../../../shared/app-alert/app-alert.component';
import { FormConsultaMedicaComponent } from '../../../../formularios/form-consulta-medica/form-consulta-medica.component';

import { ProntuarioService } from '../../../../services/prontuario.service';
import { ConsultaMedicaService } from '../../../../services/consulta-medica.service';

@Component({
  selector: 'app-consultas-medicas',
  templateUrl: './consultas-medicas.component.html'
})
export class ConsultasMedicasComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Consultas Médicas';
  public data: Array<any>;
  public title = 'Adicionar Consulta';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: ''},
    { title: 'Nome do Paciente', name: 'nomePaciente', sort: '' },
    { title: 'Médico', name: 'nomeMedico', sort: '' },
    { title: 'CRM', name: 'crmMedico', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Data', name: 'dataConsulta', sort: 'desc' }
  ];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService, 
    private prontuarioService: ProntuarioService, 
    private consultaMedicaService: ConsultaMedicaService
	) {
    this.consultaMedicaService.getConsultasMedicas().subscribe(consultasMedicas => {
      this.data = [];
      consultasMedicas.forEach(element => {
        this.data.push({
          id: element.id,
          paciente: element.paciente,
          nomePaciente: element.paciente.nome,
          prontuario: element.prontuario,
          especialidade: element.especialidade,
          tipoDeLeito: element.tipoDeLeito ? element.tipoDeLeito : '',
          tipoDeEncaminhamento: element.tipoDeEncaminhamento,
          tipoDeCuidado: element.tipoDeCuidado ? element.tipoDeCuidado : '',
          nomeMedico: element.medicoResponsavel.nome,
          crmMedico: element.medicoResponsavel.CRM,
          medicoResponsavel: element.medicoResponsavel,
          diagnostico: element.diagnostico,
          tratamento: element.tratamento,
          exames: element.exames ? element.exames : '',
          medicamentos: element.medicamentos ? element.medicamentos : '',
          internar: element.internar,
          dataConsulta: element.dataConsulta ? moment(element.dataConsulta).format('DD/MM/YYYY') : '',
        });
      })
    })
  }

  ngOnInit(): void {
  }
  
  openModal() {
    const modalRef = this.modalService.open(FormConsultaMedicaComponent,{ size: 'lg' });
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
      this.prontuarioService.delete(this.idToDelete);
      const mensagem = 'Registro deletado com sucesso!';
      this.toastr.success(mensagem);
      this.idToDelete = null;
    }).catch((error) => {
      this.idToDelete = null;
    });
  }

  onDelete(evento) {
    this.idToDelete = evento.id;
    this.mensagem = 'Deseja realmente excluir o registro?';
    this.openAlert();
  }

  onAdd(evento) {
    this.currentId = null;
    this.title = 'Adicionar Consulta';
    this.openModal();
  }

  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Data da Consulta', value: evento.dataConsulta ? evento.dataConsulta : '', tipo: 'string'},
      { label: 'Prontuário', value: evento.prontuario,  tipo: 'string'},
      { label: 'Nome do Paciente', value: evento.nomePaciente,  tipo: 'string'},
      { label: 'Médico', value: evento.nomeMedico,  tipo: 'string'},
      { label: 'CRM', value: evento.crmMedico,  tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade,  tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia, tipo: 'string'},
      { label: 'Diagnóstico', value: evento.diagnostico ? evento.diagnostico : '', tipo: 'string'},
      { label: 'Tratamento', value: evento.tratamento ? evento.tratamento : '', tipo: 'string'},
      { label: 'Exames', value: evento.exames ? evento.exames : '', tipo: 'string'},
      { label: 'Internação Autorizada?', value: evento.internar ? 'Sim' : 'Não', tipo: 'string'},      
      { label: 'Medicamentos', value: evento.medicamentos ? evento.medicamentos : '', tipo: 'string'},      
    ];
    const modalRef = this.modalService.open(DetalhesComponent,{ size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes da Consulta';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }

  onEdit(evento) {
    this.currentId = evento.id;
    this.title = 'Editar Consulta';
    this.openModal();
  }

}
