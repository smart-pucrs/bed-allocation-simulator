import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = true;
  public canEdit: boolean = true;
  public titlePage = 'Usuários';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any>=[
	  {nome: "Debora Engelmann", email: "debo.c.e.3@gmail.com", cargo: "Administrador do Sistema", ativo: "Sim"},
	{nome: "Erick Alan", email: "erick.alan@gramado.rs.gov.br", cargo: "Supervisor Almoxarifado", ativo: "Nao"},
	{nome: "Marivaldo Vivan", email: "m.vivan1@gmail.com", cargo: "Administrador do Sistema", ativo: "Sim"},
  ];
  
  
  public title = 'Adicionar Usuário';
  public mensagem = '';
  public currentId: string = null;
  private idToDelete: string = null;
  public colunas: Array<any> = [
    { title: 'Nome', name: 'nome', sort: 'asc' },
    { title: 'Email', name: 'email', sort: '' },
    { title: 'Cargo', name: 'cargo', sort: '' },
    { title: 'Ativo', name: 'ativo', sort: '' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
