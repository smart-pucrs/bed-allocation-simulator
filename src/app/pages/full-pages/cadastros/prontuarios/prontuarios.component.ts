import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prontuarios',
  templateUrl: './prontuarios.component.html',
})
export class ProntuariosComponent implements OnInit {
  public add: boolean = true;
  public canDelete: boolean = false;
  public canEdit: boolean = true;
  public titlePage = 'Prontuários';
  //public data: Array<any>;
  
  //%PLACEHOLDER%
  public data: Array<any>=[
	{prontuario: "11", nome: "Antonio de Melo", cpf: "32323233232", cartaoSus: "354651353"},
	{prontuario: "1", nome: "Fulano de Tal Junior", cpf: "09090909090", cartaoSus: "45345453434"},
	{prontuario: "3", nome: "Helena dos Santos", cpf: "34343434324", cartaoSus: "234343432"},
	{prontuario: "9", nome: "Janaina Borges de Medeiros", cpf: "32135131355", cartaoSus: "87984531658651"},
	{prontuario: "4", nome: "Joana Maria de Paula", cpf: "23433454353", cartaoSus: "235345345"},
	{prontuario: "2", nome: "Joao Sousa da Silva", cpf: "24356565656", cartaoSus: "3345435435"},
	{prontuario: "5", nome: "Joao da Silva", cpf: "34345454354", cartaoSus: "344343534"},
	{prontuario: "8", nome: "Juliana Maria da Silva", cpf: "23102103133", cartaoSus: "65489651436548"},
	{prontuario: "10", nome: "Marcelo Amaral", cpf: "23266656502", cartaoSus: "456454646545665"},
	{prontuario: "12", nome: "Maria Carolina Albuquerque", cpf: "54532513216", cartaoSus: "34654646"},
	{prontuario: "7", nome: "Paulo dos Santos", cpf: "93092302930", cartaoSus: "2378974384783247"},
  ];
  
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

  constructor() { }

  ngOnInit(): void {
  }

	//%TODO%
}
