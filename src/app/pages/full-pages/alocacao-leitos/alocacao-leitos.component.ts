import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LaudoInternacaoService } from '../../../services/laudo-internacao.service';
import { PacienteService } from '../../../services/paciente.service';
import { LeitoService } from '../../../services/leito.service';

import { Leito } from '../../../models/leito';
import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';
import { FormAlocacaoLeitosComponent } from '../../../formularios/form-alocacao-leitos/form-alocacao-leitos.component';

@Component({
  selector: 'app-alocacao-leitos',
  templateUrl: './alocacao-leitos.component.html'
})

export class AlocacaoLeitosComponent implements OnInit {
  public titlePage = 'Alocação de Leitos';
  public add : boolean = true;
  public data: Array<any>;  
  public title = 'Alocar Leito';
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' },
    { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    { title: 'Estadia', name: 'tipoDeEstadia', sort: '' },
    { title: 'Cuidados', name: 'tipoDeCuidado', sort: '' }
  ];
  public leitosSelect = [];
  leitos: Leito[] = [];

  constructor(
    private laudoInternacaoService: LaudoInternacaoService,
    private leitoService: LeitoService,
    private modalService: NgbModal,
	) {
    this.laudoInternacaoService.getLaudosPendentes().subscribe(laudos => {
      console.log('Laudos: ', laudos);
      this.data = laudos;
    })
    this.leitoService.getLeitosDisponiveis().subscribe(result => {
      console.log(result);
      this.leitos = result
      this.leitos.forEach(element => {
        this.leitosSelect.push({
          value: element,
          label: element.numero + " - " + element.tipoDeLeito + " - " + element.tipoDeCuidado + " - " + element.tipoDeEncaminhamento + " - " + element.especialidade + " - " + element.tipoDeEstadia + " - " + element.genero
        })
      });
    });
  }

  openModal() {
    const modalRef = this.modalService.open(FormAlocacaoLeitosComponent, { size: 'lg' });
    modalRef.componentInstance.title = this.title;
    modalRef.componentInstance.id = this.currentId;
    modalRef.result.then((result) => {
      if (result === 'dados editados') {
        //this.toastr.success('Dados editados com sucesso!');
      } else {
        //this.toastr.success('Dados inseridos com sucesso!');
      }
    }).catch((error) => {
      this.currentId = null;
    });
  }

  onMostrarDetalhe(evento) {
    const detalhes = [
      { label: 'Prontuário', value: evento.prontuario, tipo: 'string' },
      { label: 'Nome do Paciente', value: evento.nomePaciente, tipo: 'string' },
      { label: 'Médico', value: evento.medicoResponsavel, tipo: 'string' },
      { label: 'CRM', value: evento.crmMedico, tipo: 'string' },
      { label: 'Gênero', value: evento.genero, tipo: 'string' },
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string' },
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string' },
      { label: 'Tipo de Leito', value: evento.tipoDeLeito ? evento.tipoDeLeito : '', tipo: 'string' },
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado ? evento.tipoDeCuidado : '', tipo: 'string' },
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string' },
      { label: 'Ativo', value: evento.ativo ? 'Sim' : 'Não', tipo: 'string' },
      { label: 'Data da Internação', value: evento.dataInternacao ? new Date(evento.dataInternacao) : '', tipo: 'date' },
      { label: 'Data da Alta', value: evento.dataAlta ? new Date(evento.dataAlta) : '', tipo: 'date' },
      { label: 'Leito', value: evento.leito ? evento.leito.numero : '', tipo: 'string' },
    ];
	
    const modalRef = this.modalService.open(DetalhesComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
		}).catch((error) => {
    });
  }
  
  onValidarPlano(pacientes) {}

  ngOnInit(): void {
  }
  
  validar(){}

}
