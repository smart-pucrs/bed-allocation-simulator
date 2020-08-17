import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-situacao-leitos',
  templateUrl: './situacao-leitos.component.html',
  styleUrls: ['./situacao-leitos.component.scss']
})
export class SituacaoLeitosComponent implements OnInit {  
  public add: boolean = false;
  public canDelete: boolean = false;
  public canEdit: boolean = false;
  public titlePage = 'Situação dos Leitos';
  public data: Array<any>;
  public title = 'Alocação de Leitos';
  public mensagem = '';
  public currentId: string = null;
  public colunas: Array<any> = [
    { title: 'Leito', name: 'numero', sort: 'asc' },
    { title: 'Status', name: 'status', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo de Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
