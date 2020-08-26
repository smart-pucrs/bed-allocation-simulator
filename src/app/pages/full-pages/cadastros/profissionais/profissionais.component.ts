import { Component, OnInit } from '@angular/core';

import { ProfissionalService } from '../../../../services/profissional.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
})
export class ProfissionaisComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Profissionais';
  public data: Array<any>;
  public title = 'Adicionar Profissional';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'CPF', name: 'cpf', sort: '' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'CRM', name: 'CRM', sort: '' }
  ];

  constructor(private profissionalService: ProfissionalService) {
    this.profissionalService.getProfissionais().subscribe(profissionais => {
      this.data = profissionais;
    })
  }

  ngOnInit(): void {
  }
}
