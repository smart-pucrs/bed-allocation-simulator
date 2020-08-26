import { Component, OnInit } from '@angular/core';

import { ProntuarioService } from '../../../../services/prontuario.service';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
})
export class ProntuariosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Prontuários';
  public data: Array<any>;
  public title = 'Adicionar Prontuário';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Prontuário', name: 'prontuario', sort: '' },
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'CPF', name: 'cpf', sort: '' },
    { title: 'Cartão SUS', name: 'cartaoSus', sort: '' }
  ];

  constructor(private prontuarioService: ProntuarioService,) {
    this.prontuarioService.getProntuarios().subscribe(prontuarios => {
      this.data = prontuarios;
    });
  }

  ngOnInit(): void {
  }
}
