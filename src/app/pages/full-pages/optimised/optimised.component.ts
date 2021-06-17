import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';
import { OptimiserResultService } from 'app/services/optimiser-result.service';

@Component({
  selector: 'app-optimised',
  templateUrl: './optimised.component.html',
  styleUrls: ['./optimised.component.scss']
})
export class OptimisedComponent implements OnInit {
  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = false;
  public titlePage = 'Alocação de Leitos Otimizada';
  public data: Array<any>;
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: 'asc' },
    { title: 'Nome', name: 'nomePaciente', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' },
    // { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    // { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    // { title: 'Estadia', name: 'tipoDeEstadia', sort: '' },
    // { title: 'Cuidados', name: 'tipoDeCuidado', sort: '' },
    { title: 'Leito sugerido', name: 'numLeito', sort: '' }
  ];

  public result: Array<any>;

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private optimiserResult: OptimiserResultService) {

    this.optimiserResult.getOptimiserResults().subscribe(dados => {
      this.result = dados;
      this.result.forEach(element => {
        if (!element.alreadySuggested) {
          this.data = element.laudosData;
          this.data.forEach(laudo => {
            laudo.numLeito = laudo.leito.numero;
          })
          console.log(this.data);                    
        }
      })
    });
    console.log(this.data);
  }

  public ngOnInit(): void { }

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
      { label: 'Leito Sugerido', value: evento.leito ? evento.leito.numero : '', tipo: 'string' },
    ];

    const modalRef = this.modalService.open(DetalhesComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }
}
