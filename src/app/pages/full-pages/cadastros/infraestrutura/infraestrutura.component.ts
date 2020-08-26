import { Component, OnInit } from '@angular/core';

import { InfraestruturaService } from '../../../../services/infraestrutura.service';

@Component({
  selector: 'app-infraestrutura',
  templateUrl: './infraestrutura.component.html'
})
export class InfraestruturaComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Infraestrutura';
  public data: Array<any>;
  public title = 'Adicionar Quarto';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'Especialidade', name: 'especialidade', sort: '' },
    { title: 'Tipo', name: 'tipoDeLeito', sort: '' },
    { title: 'Encaminhamento', name: 'tipoDeEncaminhamento', sort: '' },
    { title: 'Gênero', name: 'genero', sort: '' }
  ];

  constructor(private infraestruturaService: InfraestruturaService) {
    this.infraestruturaService.getInfraestrutura().subscribe(infraestrutura => {
      this.data = infraestrutura;
    })
  }

  ngOnInit(): void {
  }
  
}
