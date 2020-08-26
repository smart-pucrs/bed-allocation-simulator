import { Component, OnInit, Input } from '@angular/core';
import { SharedModule} from '../../../shared/shared.module';

import { LeitoService } from '../../../services/leito.service';

@Component({
  selector: 'app-situacao-leitos',
  templateUrl: './situacao-leitos.component.html'
})

export class SituacaoLeitosComponent implements OnInit {  
  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = false;
  public titlePage = 'Situação dos Leitos';
  public currentId: string = null;
  public data: Array<any>;
  public title = 'Alocação de Leitos';
  public mensagem = '';
  public colunas: Array<any> = [
    { title: 'Leito', name: 'numero', sort: 'asc' },
    { title: 'Status', name: 'status', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo de Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' }
  ];

  constructor(private leitoService: LeitoService) { 
	this.leitoService.getLeitos().subscribe(leitos => {
      this.data = leitos;      
    })
  }

  ngOnInit(): void {
  }
  
  public test : any;
  onMostrarDetalhe(evento) {
    let paciente: any;
    if (evento.paciente){
      paciente = [
        { label: 'Prontuário', value: evento.paciente.prontuario, tipo: 'string'},
        { label: 'Nome', value: evento.paciente.nome, tipo: 'string'},
        { label: 'Idade', value: evento.paciente.idade, tipo: 'string'},
        { label: 'Gênero', value: evento.paciente.genero, tipo: 'string'},
      ];
    }
    const detalhes = [
      { label: 'Leito', value: evento.numero, tipo: 'string'},
      { label: 'Status', value: evento.status, tipo: 'string'},
      { label: 'Especialidade', value: evento.especialidade, tipo: 'string'},
      { label: 'Gênero', value: evento.genero, tipo: 'string'},
      { label: 'Idade', value: evento.age, tipo: 'string'},
      { label: 'Tipo de Leito', value: evento.tipoDeLeito, tipo: 'string'},
      { label: 'Tipo de Encaminhamento', value: evento.tipoDeEncaminhamento, tipo: 'string'},
      { label: 'Tipo de Cuidado', value: evento.tipoDeCuidado, tipo: 'string'},
      { label: 'Tipo de Estadia', value: evento.tipoDeEstadia ? evento.tipoDeEstadia : '', tipo: 'string'},
      { label: 'Paciente', value: evento.paciente ? paciente : '', tipo: 'array'},
    ];
	this.test = detalhes;
  }
  
  onEdit(evento) {}
  onDelete(evento) {}
  onAdd(evento) {}

}
