import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { DetalhesComponent } from '../../../shared/detalhes/detalhes.component';
import { OptimiserResultService } from 'app/services/optimiser-result.service';
import { ValidacoesService } from 'app/services/validacoes.service';

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
  public showButtons: boolean = true;
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
  private aloc: any;

  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private validacoesService: ValidacoesService,
    private optimiserResultService: OptimiserResultService) {

    this.optimiserResultService.getOptimiserResults().subscribe(dados => {
      this.result = dados;
      console.log(this.result);
      if (this.result.length > 0) {
        let flag = false;
        this.result.forEach(element => {
          if (!element.alreadySuggested) {
            this.aloc = element;
            flag = true;
            this.data = element.laudosData;
            this.data.forEach(laudo => {
              laudo.numLeito = laudo.leito.numero;
            })
            console.log(this.data);                    
          }
        });
        if (!flag) {
          this.data = [];
        }
      }else{
        this.data = [];
      }
    });
    console.log(this.data);
  }

  public ngOnInit(): void { }

  onMostrarDetalhe(evento) {
    let leito: any;
    if (evento.leito){
      leito = [
        { label: 'Leito', value: evento.leito.numero, tipo: 'string'},
        { label: 'Status', value: evento.leito.status, tipo: 'string'},
        { label: 'Especialidade', value: evento.leito.especialidade, tipo: 'string'},
        { label: 'Gênero', value: evento.leito.genero, tipo: 'string'},
        { label: 'Idade', value: evento.leito.age, tipo: 'string'},
        { label: 'Tipo de Leito', value: evento.leito.tipoDeLeito, tipo: 'string'},
        { label: 'Tipo de Encaminhamento', value: evento.leito.tipoDeEncaminhamento, tipo: 'string'},
        { label: 'Tipo de Cuidado', value: evento.leito.tipoDeCuidado, tipo: 'string'},
        { label: 'Tipo de Estadia', value: evento.leito.tipoDeEstadia ? evento.leito.tipoDeEstadia : '', tipo: 'string'},
      ];
    }
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
      // { label: 'Data da Internação', value: evento.dataInternacao ? new Date(evento.dataInternacao) : '', tipo: 'date' },
      // { label: 'Data da Alta', value: evento.dataAlta ? new Date(evento.dataAlta) : '', tipo: 'date' },
      // { label: 'Leito Sugerido', value: evento.leito ? evento.leito.numero : '', tipo: 'string' },

      { label: 'Leito Sugerido', value: evento.leito ? leito : '', tipo: 'array'},
    ];

    const modalRef = this.modalService.open(DetalhesComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Detalhes do Laudo';
    modalRef.componentInstance.detalhes = detalhes;
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }

  onAdd(event) {
    console.log(this.aloc);
    this.aloc.alocar = true;
    this.aloc.alreadySuggested = true;
    this.optimiserResultService.update(this.aloc, this.aloc.id);
    this.validacoesService.setValidacaoConcluida();
    this.toastr.success('Estamos alocando os pacientes conforme solicitado.');
  }

  onDelete(event) {
    console.log(this.aloc);
    this.aloc.alreadySuggested = true;
    this.optimiserResultService.update(this.aloc,this.aloc.id);
    this.validacoesService.setValidacaoConcluida();
    this.toastr.success('Sugestão de alocação descartada com sucesso.');
  }
}
